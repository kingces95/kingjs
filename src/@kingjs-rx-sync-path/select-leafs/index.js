var {
  '@kingjs': {
    IObservable,
    '-rx': { 
      '-sync': { SelectMany,
        '-static': { of }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Selects leafs of a tree. 
 * @this any An `IObservable` of leafs or values that can be projected into nodes.
 * @param [nodeSelector] Given a value, return a node or null if the value is a leaf.
 * @returns Returns an `IObservable` that emits the leafs of a tree.
 * 
 * @callback nodeSelector
 * @param value The observation to project into a node.
 * @returns Returns an `IObservable` of leafs or values that can be projected into nodes.
 */
function selectLeafs(nodeSelector) {
  return this
    [SelectMany](o => {
      var node = nodeSelector(o)

      if (node)
        return node[SelectLeafs](nodeSelector)
      
      return of(o)
    }
  )
}

module[ExportInterfaceExtension](IObservable, selectLeafs)
var SelectLeafs = module.exports
