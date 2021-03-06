var {
  '@kingjs': {
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/** 
 * @description Adds edges and vertices to this poset.
 * 
 * @this any The poset.
 * @param poset The poset to merge into this poset.
 */
function add(poset) {
  var target = this
  var source = poset

  for (var current in source) {
    var children = target[current]
    if (!children)
      children = target[current] = []
    
    for (var child of source[current])
      children.push(child)
  }

  return this
}

module[ExportExtension](Object, add)