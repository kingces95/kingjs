var { 
  '@kingjs-module': {
    ExportExtension
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an array of nodes in a link list
 * 
 * @this any The head of the linked list
 * 
 * @param next A callback that returns the next element of the list.
 * @param [select] A callback that selects a value from the node for inclusion in the array.
 * 
 * @returns Returns an array of links.
 */
function toArray(next, select = o => o) {
  var result = []
  var node = this
  
  while (node) {
    result.push(select(node))
    node = next(node)
  }

  return result
}

module[ExportExtension](Object, toArray)