var {
  '@kingjs': {
    LessThan,
    IObservable,
    IObservable: { Next },
    '-rx': {
      '-sync': { Select, RollingZipJoin, GroupBy, Regroup, Log },
      '-subject': { Subject },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Observe changes to a set over time. First, groups are emitted for each element 
 * of the set. Then, each subsequent version of the set is compared to the previously set, and 
 * as elements come, go and/or are retained, groups are created, completed, and/or will emit 
 * the element whose key currently matches the group. 
 * 
 * @this any An `IObservable` of sets where a set is a sorted container which
 * implements `IEnumerable`.
 * @param [selectKey] Selects an element's key.
 * @param [compareKey] Compares if one key is less than another.
 * @returns Returns an `IObservable` that emits an `IGroupedObservable` for each element's 
 * key which in turn emits the element itself.
 * 
 * @callback selectKey
 * @param element An element of the set.
 * @returns Returns a key for `element`.
 * 
 * @callback compareKey
 * @param left An element key.
 * @param right Another element key.
 * @returns Returns true if `left` is less than `right`, otherwise false. 
 */
function groupSetBy(
  selectKey = Identity,
  compareKey = LessThan) {

  return this
    [RollingZipJoin](selectKey, compareKey)
    [GroupBy](
      o => selectKey(o.outer !== null ? o.outer : o.inner),
      o => o.outer === null
    )
    [Regroup](group => group[Select](o => o.outer))
}

module[ExportInterfaceExtension](IObservable, groupSetBy)
