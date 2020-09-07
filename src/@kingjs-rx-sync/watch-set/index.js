var { assert,
  '@kingjs': {
    EmptyObject,
    Identity,
    Comparer: { default: Comparer },
    IComparer,
    IObservable,
    '-rx': {
      '-subject': { CollectibleSubject },
      '-sync': { Select, RollingZipJoin, GroupBy, Regroup, Log },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function createSubject(cancel) {
  return new CollectibleSubject(cancel, o => o.outer === null)
}

/**
 * @description Observe changes to a set over time. First, groups are emitted for each element 
 * of the set. Then, each subsequent version of the set is compared to the previously set, and 
 * as elements come, go and/or are retained, groups are created, completed, and/or will emit 
 * the element whose key currently matches the group. 
 * 
 * @this any An `IObservable` of sets where a set is a sorted container which
 * implements `IEnumerable`.
 * @param [options] Pojo of the form { keySelector, keyComparer } where the 
 * later implements `IComparer` and is `EqualityComparer.default` by default.
 * @returns Returns an `IObservable` that emits an `IGroupedObservable` for 
 * each element's key which in turn emits the element itself.
 * 
 * @callback keySelector
 * @param element An element of the set. Default is `Identity`.
 * @returns Returns a key for `element`.
 * 
 * @callback keyComparer
 * @param element An element of the set. Default is `EqualityComparer.default`.
 * @returns Returns a key for `element`.
 */
function watchSet(options = EmptyObject) {
  var {
    keySelector = Identity, 
    keyComparer = Comparer 
  } = options

  assert.ok(keyComparer instanceof IComparer)
  var keyEqualityComparer = keyComparer

  return this
    [RollingZipJoin](keySelector, keyComparer)
    [GroupBy](o => o.key, { keyEqualityComparer, createSubject })
    [Regroup](group => group[Select](o => o.outer))
}

module[ExportInterfaceExtension](IObservable, watchSet)
