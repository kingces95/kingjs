var {
  '@kingjs': {
    LessThan,
    IObservable,
    '-rx': {
      '-sync': { Select, RollingZipJoin, GroupBy, Regroup, Log }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o

/**
 * @description Observe changes to a set over time. First, groups are emitted for each element 
 * of the set. Then, each subsequent version of the set is compared to the previously set, and 
 * as elements come, go and/or are retained, groups are created, completed, and/or will emit 
 * the element whose key currently matches the group. 
 * 
 * @this any An `IObservable` of sets.
 * @param [keySelector] Selects an element's key.
 * @param [keyComparer] Compares if one key is less than another.
 * @returns Returns an `IObservable` that emits an `IGroupedObservable` for each element's key 
 * key which in turn emits the element itself.
 * 
 * @callback setSelector
 * @param value The observation to project into a set.
 * @returns Returns a set as represented as a sorted iterable (e.g. a sorted array).
 * 
 * @callback comparableKeySelector
 * @param element An element of the set.
 * @returns Returns a key for `element`.
 * 
 * @callback keyComparer
 * @param left An element key.
 * @param right Another element key.
 * @returns Returns true if `left` is less than `right`, otherwise false. 
 */
function groupSetBy(
  keySelector = Identity,
  keyComparer = LessThan) {

  return this
    [RollingZipJoin](keySelector, keyComparer)
    [GroupBy](
      o => keySelector(o.outer !== null ? o.outer : o.inner), 
      o => o.outer === null
    )
    [Regroup](group => group[Select](o => o.outer))
}

module[ExportExtension](IObservable, groupSetBy)
