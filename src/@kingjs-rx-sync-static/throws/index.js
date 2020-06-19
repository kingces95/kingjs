var { 
  '@kingjs': { IObserver: { Subscribed, Error },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }
var Options = { name: throws.name }

/**
 * @description Create an `IObservable` that raises an error.
 * @param error The error to raise.
 * @returns Returns `IObservable` that raises `error`.
 */
function throws(error = null) {
  return create(observer => {
    observer[Subscribed](Noop)
    observer[Error](error)
  }, Options)
}

module.exports = throws