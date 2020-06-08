var {
  '@kingjs': {
    IObservable,
    IGroupedObservable: { Key },
    '-rx': {
      '-async': { SelectMany },
      '-sync': { Select, Regroup }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Project a stream of groups of elements into a stream 
 * of the respective content of each group.
 * 
 * @this any The `IGroupedObservable`.
 * @param [selector] Projects an element of the group given the key.
 * 
 * @callback selector
 * @param element An element of the group.
 * @param key The key corresponding to the respective group of the element.
 * @returns Returns a resulting element of the stream.
 * 
 * @returns Returns a new `IObservable` that emits many values for each
 * group emitted by the source `IGroupedObservable`.
 */
function disband(select = Identity) {

  return this
    [Select](group => {
      var key = group[Key]
      return group[Select](value => ({ key, value }))
    })
    [SelectMany]()
    [Select](o => select(o.value, o.key))
}

module[ExportExtension](IObservable, disband)
