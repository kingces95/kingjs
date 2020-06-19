var {
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { Select, RollingZipJoin, GroupBy, Regroup }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var LessThan = (l, r) => l < r

/**
 * @description Selects a set of ordered unique observations per observation, 
 * groups them, and if a subsequent set contains no observation corresponding 
 * to a group, then closes that group.
 * 
 * @this any The source `IObservable`.
 * @param [manySelector] Selects an `IObservable` of unique ordered observations.
 * @param [keySelector] Selects the group key.
 * @param [keyComparer] Compare if one key is less than another key.
 * @returns Returns an `IObservable` that emits `IGroupedObservable`s.
 * 
 * @callback manySelector
 * @param value The value to turn into many unique ordered values.
 * @returns Returns an unique ordered `IObservable`.
 * 
 * @callback keySelector
 * @param value One of the many values selected by `manySelector`.
 * @returns Returns the key for `value`.
 * 
 * @callback keyCompare
 * @param left One of the many values selected by `manySelector`.
 * @param right Another one of the many values selected by `manySelector`.
 * @returns Returns true if `left` is less than `right`. 
 * 
 * @remarks A group will be closed if a set contains no observations with
 * a matching key.
 */
function selectManyGroups(
  manySelector = Identity, 
  keySelector = Identity,
  keyCompare = LessThan) {

  return this
    [Select](manySelector)
    [RollingZipJoin](keySelector, keyCompare)
    [GroupBy](
      o => keySelector(o.outer !== null ? o.outer : o.inner), 
      o => o.outer === null
    )
    [Regroup](group => group[Select](o => o.outer))
}

module[ExportExtension](IObservable, selectManyGroups)
