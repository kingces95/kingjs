var {
  ['@kingjs']: {
    graph: { poset: { Copy } },
    module: { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/** 
 * @description Strips edegs from a poset to form a tree whose
 * traversal is a total order of the poset. 
 * 
 * @this Poset The poset to strip to a tree.
 * @param roots The roots to include in the tree (or multi-tree)
 * @param leafs The leafs to incldue in the tree
 * @returns Returns a tree whose traversal prodcues a total order
 * of the poset and include only vertexes and edges needed to connect
 * the specified roots, and leafs.
 * 
 * @this any The poset.
 */
function toTree(roots, leafs) {
  return this[Copy](roots, leafs, true)
}

module[ExportExtension](Object, toTree)