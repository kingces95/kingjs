var { 
  '@kingjs': {
    IObservable,
    '-rx': {
      '-sync': { SelectMany, RollingBuffer, Select,
        '-static': { from: rx }
      }
    },
    '-linq': { ZipJoin, 
      '-reduction': { ToArray },
      '-static': { from: linq }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Identity = o => o
var LessThan = (l,r) => l < r

/**
 * @description Emit changes over time to versions of an ordered iterable. 
 * @param [selectKey] Selects the key by which the iterable is ordered. Default is identity.
 * @param [selectResult] Select the difference between two 
 * versions. Default is { previous, current, key }.
 * @param [compareKeys] Compares two keys. Default is `l < r`.
 * @returns Returns an `IObservable` which emits full outer joins 
 * of an ordered iterable and its previous version.
 * 
 * @callback selectKey
 * @param element An element of the iterable.
 * @result The key of the element of the iterable.
 * 
 * @callback selectResult
 * @param current The current element of the iterable or null.
 * @param previous The previous element with matching key of the iterable or null.
 * @param key The key of current and/or previous.
 * 
 * @callback compareKeys
 * @param left The left key.
 * @param right The right key.
 * @returns Returns true if the left key is less than the right key.
 */
function rollingZipJoin(
  selectKey = Identity,
  compareKeys = LessThan) {

  return this
    [Select](o => linq(o))
    [RollingBuffer]()
    [Select](o =>
      o[0][ZipJoin](o[1],
        selectKey, 
        selectKey,
        compareKeys
      )
    )
    [Select](o => o[ToArray]())
    [Select](o => rx(o))
    [SelectMany]()
}

module[ExportExtension](IObservable, rollingZipJoin)
