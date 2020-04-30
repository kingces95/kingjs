var {
  ['@kingjs']: {
    array: { Peek },
    pojo: { Reduce: ReduceObject },
    graph: { poset: { Reduce: ReducePoset } },
    module: { ExportExtension }
  }
} = require('./dependencies')

var EmptyObject = { }

/** 
 * @description Strips edegs from a poset to form a tree whose
 * traversal is a total order of the poset. 
 * 
 * @this any The poset.
 */
function toTree(options = EmptyObject) {
  return this[ReducePoset](
    (tree, current, stack) => { 
      if (!stack.length) {
        if (!tree[current])
          tree[current] = []
        return
      }

      var parent = stack[Peek]()

      var children = tree[parent]
      if (!children)
        children = tree[parent] = []

      children.push(current)
    },
    { },
    options
  )
}

module[ExportExtension](Object, toTree)