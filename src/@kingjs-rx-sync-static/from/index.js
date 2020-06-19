var { 
  '@kingjs': { 
    '-rx': {
      '-sync-static': { iterate },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` from an iterable object.
 * @param iterable The iterable object.
 * @returns Returns `IObservable` that emits elements in the object.
 */
function from(iterable) {
  return iterate(iterable[Symbol.iterator]())
}

module.exports = from