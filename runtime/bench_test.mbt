///|
/// 基准辅助：计算一次 set_state 的传输量对比。
/// 返回 (补丁字节数, 全量 setData 字节数, 补丁条目数)。
/// 无变化时补丁字节数为 0（框架完全不调用 setData）。
fn patch_stats(old : Json, new_ : Json) -> (Int, Int, Int) {
  let patch = diff_partial(old, new_)
  if patch.length() == 0 {
    return (0, new_.stringify().length(), 0)
  }
  let patch_bytes = patch_to_json(patch).stringify().length()
  let full_bytes = new_.stringify().length()
  (patch_bytes, full_bytes, patch.length())
}

///|
/// 构造 [start, start+n) 的模拟报销清单（发票形态：名称 + 金额）
fn list_items_range(start : Int, n : Int) -> Json {
  let arr : Array[Json] = []
  for i in 0..<n {
    let idx = start + i
    arr.push({
      "name": "报销项目-\{idx}",
      "amount": (idx % 997 * 13).to_double() / 100.0,
    })
  }
  { "list": jarr(arr) }
}

///|
/// P0 基准：补丁传输量 vs 全量 setData（快照即 README 数据来源，
/// 变化即性能回归）。
test "bench: diff 引擎补丁传输量对比" {
  let buf = StringBuilder()
  // 场景 1：1000 项列表追加 1 项
  let (p1, f1, n1) = patch_stats(
    list_items_range(0, 1000),
    list_items_range(0, 1001),
  )
  buf.write_string(
    "list_append_1_of_1000: patch=\{p1}B full=\{f1}B entries=\{n1} saved=\{100 - p1 * 100 / f1}%",
  )
  // 场景 2：深层对象改一个叶子
  let old2 : Json = {
    "user": { "profile": { "name": "兔", "city": "月城", "level": 3 } },
    "other": "untouched",
  }
  let new2 : Json = {
    "user": { "profile": { "name": "兔", "city": "月城", "level": 4 } },
    "other": "untouched",
  }
  let (p2, f2, n2) = patch_stats(old2, new2)
  buf.write_string(
    "; deep_leaf: patch=\{p2}B full=\{f2}B entries=\{n2} saved=\{100 - p2 * 100 / f2}%",
  )
  // 场景 3：无变化（框架完全不调用 setData）
  let (p3, f3, n3) = patch_stats(new2, new2)
  buf.write_string("; no_change: patch=\{p3}B full=\{f3}B entries=\{n3}")
  // 场景 4：头部删除（最坏情况：整数组替换）
  let (p4, f4, n4) = patch_stats(
    list_items_range(0, 1000),
    list_items_range(1, 999),
  )
  buf.write_string(
    "; head_delete_1_of_1000: patch=\{p4}B full=\{f4}B entries=\{n4} saved=\{100 - p4 * 100 / f4}%",
  )
  // 场景 5：追加 100 项
  let (p5, f5, n5) = patch_stats(
    list_items_range(0, 1000),
    list_items_range(0, 1100),
  )
  buf.write_string(
    "; list_append_100_of_1000: patch=\{p5}B full=\{f5}B entries=\{n5} saved=\{100 - p5 * 100 / f5}%",
  )
  json_inspect(
    buf.to_string(),
    content="list_append_1_of_1000: patch=49B full=34959B entries=1 saved=100%; deep_leaf: patch=24B full=75B entries=1 saved=68%; no_change: patch=0B full=75B entries=0; head_delete_1_of_1000: patch=34895B full=34895B entries=1 saved=0%; list_append_100_of_1000: patch=4815B full=38438B entries=100 saved=88%",
  )
}
