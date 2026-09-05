///|
test "diff: 根对象新增键" {
  let old : Json = Json::empty_object()
  let new_ : Json = { "count": 3, "label": "兔" }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="2")
  json_inspect(patch_to_json(patch), content={ "count": 3, "label": "兔" })
}

///|
test "diff: 相等子树不产生补丁" {
  let old : Json = { "a": 1, "u": { "x": 1, "y": 2 }, "list": [1, 2, 3] }
  let new_ : Json = { "a": 1, "u": { "x": 1, "y": 2 }, "list": [1, 2, 3] }
  inspect(diff_to_paths(old, new_).length(), content="0")
}

///|
test "diff: 深层嵌套只报告叶子路径" {
  let old : Json = { "u": { "name": "兔", "age": 1 } }
  let new_ : Json = { "u": { "name": "月", "age": 1 } }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="u.name")
}

///|
test "diff: 数组等长按下标最小补丁" {
  let old : Json = { "list": [1, 2, 3] }
  let new_ : Json = { "list": [1, 9, 3] }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="list[1]")
}

///|
test "diff: 数组增长只补新下标" {
  let old : Json = { "list": [{ "n": "a" }] }
  let new_ : Json = { "list": [{ "n": "a" }, { "n": "b" }] }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="list[1]")
}

///|
test "diff: 数组缩短 → 整数组替换" {
  let old : Json = { "list": [1, 2, 3] }
  let new_ : Json = { "list": [1] }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="list")
}

///|
test "diff: 键被删除 → 整对象替换" {
  let old : Json = { "u": { "name": "兔", "tmp": 1 } }
  let new_ : Json = { "u": { "name": "兔" } }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="u")
}

///|
test "diff: 类型变化整值替换" {
  let old : Json = { "v": 1 }
  let new_ : Json = { "v": "1" }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="v")
}

///|
test "diff: 根类型变化铺开顶层键" {
  let old : Json = { "a": 1 }
  let new_ : Json = [1, 2]
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="")
}

///|
test "diff_from_scratch: 无镜像时全量铺开" {
  let patch = diff_from_scratch({ "a": 1, "b": { "c": 2 } })
  inspect(patch.length(), content="2")
  inspect(patch[0].0, content="a")
  inspect(patch[1].0, content="b")
}

///|
test "diff_partial: 未提及的键保持不变（合并语义）" {
  let old : Json = { "input": "1", "upper": "壹圆", "samples": [1, 2, 3] }
  let new_ : Json = { "input": "2" }
  let patch = diff_partial(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="input")
}

///|
test "diff_partial: 子树变化正常展开（含数组缩短）" {
  let old : Json = { "list": [1, 2, 3], "keep": true }
  let new_ : Json = { "list": [1] }
  let patch = diff_partial(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="list")
}

///|
test "diff_partial: 新增根键直接加入补丁" {
  let old : Json = { "a": 1 }
  let new_ : Json = { "b": { "c": 2 } }
  let patch = diff_partial(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="b")
}

///|
test "diff: 数组内对象字段变化用路径" {
  let old : Json = {
    "items": [{ "n": "a", "done": false }, { "n": "b", "done": false }],
  }
  let new_ : Json = {
    "items": [{ "n": "a", "done": false }, { "n": "b", "done": true }],
  }
  let patch = diff_to_paths(old, new_)
  inspect(patch.length(), content="1")
  inspect(patch[0].0, content="items[1].done")
}
