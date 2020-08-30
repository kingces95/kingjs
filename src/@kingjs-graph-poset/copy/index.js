var {
  '@kingjs': {
    '-graph-poset': { Reduce: ReducePoset },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/** 
 * @description Copies a poset. 
 * 
 * @this Poset The poset.
 * @param [roots] An array of roots.
 * @param [leafs] An array of leafs. 
 * @param [visitOncePerParent] Copy only one inbound edge per vertex.
 * 
 * @returns Returns a copy of `poset` with only vertices and edges
 * that depend on `leafs` and are depended upon by `roots`.
 * 
 * @remarks If `roots` or `leafs` are unspecified, then all `roots` or
 * `leafs` are assumed included in the resulting poset.
 */
function copy(roots, leafs, visitOncePerParent) {

  return this[ReducePoset](
    (tree, current, parent) => { 
      if (!parent) {
        if (!tree[current])
          tree[current] = []
        return
      }

      var children = tree[parent]
      if (!children)
        children = tree[parent] = []

      children.push(current)
    }, { }, { 
      roots, 
      leafs, 
      visitPerParent: !visitOncePerParent
    }
  )
}

module[ExportExtension](Object, copy)