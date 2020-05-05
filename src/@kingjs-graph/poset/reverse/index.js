var {
  ['@kingjs']: {
    graph: { poset: { Reduce: ReducePoset } },
    module: { ExportExtension }
  }
} = require('./dependencies')

var EmptyObject = { }

/** 
 * @description Reverses the links of the poset.
 * 
 * @this any The poset.
 * @param options A subset of `Reduce` { roots, leafs }
 */
function reverse(options = EmptyObject) {
  return this[ReducePoset](
    (tree, current, parent) => { 
      if (!parent)
        return

      var children = tree[current]
      if (!children)
        children = tree[current] = []

      children.push(parent)
    }, { }, { 
      ...options,
      visitPerParent: true
    }
  )
}

module[ExportExtension](Object, reverse)