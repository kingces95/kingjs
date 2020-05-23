var { 
  '@kingjs': {
    '-rx-async-static': { from },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` from `arguments`.
 * 
 * @returns Returns `IObservable` that emits elements `arguments`.
 * 
 * @remarks All values are emitted asynchronously.
 */
function of() {
  return from([...arguments])
}

module.exports = of