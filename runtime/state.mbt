///|
/// 状态 diff：计算把 old 变为 new_ 所需的最小 setData 路径补丁。
///
/// 这是微信性能优化的核心：setData 按路径更新比整对象更新传输量小得多
/// （官方文档明确要求"只设置变化的路径"）。补丁形如
/// `[("user.name", "x"), ("list[2].done", true)]`，由 JS 侧
/// `setData(JSON.parse({...}))` 应用。
///
/// 规则：
/// - 子树相等（`Json::equal`）→ 不产生任何条目（含空数组/空对象）
/// - 对象：新增/修改的键 → 递归；有键被删除 → 整对象替换
///   （setData 无法按键删除，只能覆盖父级）
/// - 数组：长度相同 → 按下标递归（`arr[2]` 路径）；长度不同 → 整数组替换
/// - 类型变化或标量变化 → 整值替换
///
/// # Example
/// ```mbt check
/// test {
///   let old : Json = { "u": { "name": "兔", "age": 1 } }
///   let new_ : Json = { "u": { "name": "月", "age": 1 } }
///   let patch = diff_to_paths(old, new_)
///   inspect(patch.length(), content="1")
///   inspect(patch[0].0, content="u.name")
/// }
/// ```
pub fn diff_to_paths(old : Json, new_ : Json) -> Array[(String, Json)] {
  let acc : Array[(String, Json)] = []
  diff_node("", Some(old), new_, acc)
  acc
}

///|
/// 部分状态 diff（根层合并语义）：只对 new_ 里出现的顶层键做路径级 diff，
/// 未提及的键保持不变。这与 React setState / setData 的合并语义一致，
/// 是 set_state 的默认行为。数组缩短等子树内部变化仍会被正确检测
/// （该子树整体走 diff_node 逻辑）。
pub fn diff_partial(old : Json, new_ : Json) -> Array[(String, Json)] {
  let acc : Array[(String, Json)] = []
  match (old, new_) {
    (Json::Object(om), Json::Object(nm)) =>
      for k, nv in nm {
        let child = k
        match om.get(k) {
          Some(ov) => diff_node(child, Some(ov), nv, acc)
          None => acc.push((child, nv))
        }
      }
    (_, _) => emit_replace("", new_, acc)
  }
  acc
}

///|
/// 从 None 起算的便捷入口：把 new_ 全量铺开为顶层键路径
/// （首帧无镜像 / 数据不可 JSON 化时使用）
pub fn diff_from_scratch(new_ : Json) -> Array[(String, Json)] {
  let acc : Array[(String, Json)] = []
  diff_node("", None, new_, acc)
  acc
}

///|
fn diff_node(
  path : String,
  old : Json?,
  new_ : Json,
  acc : Array[(String, Json)],
) -> Unit {
  // 完全相等 → 无补丁（这是"最小化"的关键来源之一）
  match old {
    Some(o) => if Json::equal(o, new_) { return }
    None => ()
  }
  match (old, new_) {
    (Some(Json::Object(om)), Json::Object(nm)) => {
      // 删除检测：任一旧键不存在 → 只能整对象覆盖
      let mut removed = false
      for k, _ in om {
        if !nm.contains(k) {
          removed = true
          break
        }
      }
      if removed {
        emit_replace(path, new_, acc)
        return
      }
      for k, nv in nm {
        let child = if path is "" { k } else { "\{path}.\{k}" }
        match om.get(k) {
          Some(ov) => diff_node(child, Some(ov), nv, acc)
          None => acc.push((child, nv))
        }
      }
    }
    (Some(Json::Array(oa)), Json::Array(na)) =>
      // 增长/等长 → 下标级最小补丁（setData 设 "arr[n]" 可越界追加）；
      // 缩短 → 整数组替换（setData 无 splice 路径语义）
      if na.length() >= oa.length() {
        for i, nv in na {
          let child = "\{path}[\{i}]"
          if i < oa.length() {
            diff_node(child, Some(oa[i]), nv, acc)
          } else {
            acc.push((child, nv))
          }
        }
      } else {
        emit_replace(path, new_, acc)
      }
    (_, _) => emit_replace(path, new_, acc)
  }
}

///|
/// 根节点（path 为空）的整对象替换要铺开为顶层键，
/// 因为 setData 不接受空字符串路径。
fn emit_replace(
  path : String,
  value : Json,
  acc : Array[(String, Json)],
) -> Unit {
  if path is "" {
    match value {
      Json::Object(nm) =>
        for k, v in nm {
          acc.push((k, v))
        }
      other => acc.push((path, other))
    }
  } else {
    acc.push((path, value))
  }
}

///|
/// 把路径补丁组装为 setData 兼容的 JSON 对象（路径为键）
pub fn patch_to_json(patch : Array[(String, Json)]) -> Json {
  let m : Map[String, Json] = Map([])
  for pair in patch {
    m[pair.0] = pair.1
  }
  Json::object(m)
}

///|
/// (内部) 读取页面/组件实例的当前 data 并序列化为 JSON 字符串。
/// this.data 由微信运行时维护，始终等于已合并的视图状态，
/// 因此它是 set_state 天然的镜像，无需在 MoonBit 侧另存。
extern "js" fn js_data_string(self_ : JsVal) -> String =
  #|(self_) => {
  #|  try {
  #|    return JSON.stringify(self_.data);
  #|  } catch (err) {
  #|    return "";
  #|  }
  #|}

///|
/// (内部) 对实例应用路径补丁（补丁已序列化为 JSON 对象字符串）
extern "js" fn js_apply_patch(self_ : JsVal, patch : String) -> Unit =
  #|(self_, patch) => {
  #|  self_.setData(JSON.parse(patch));
  #|}
