var { 
  '@kingjs': { IObserver: { Error },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }

/**
 * @description Create an `IObservable` that raises an error.
 * @param error The error to raise.
 * @returns Returns `IObservable` that raises `error`.
 */
function throws(error = null) {
  
  return create(function(observer) {
    observer[Error](error)
  }, Noop)
}

module.exports = throws