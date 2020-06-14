var { 
  '@kingjs': { 
    IObserver: { Error },
    '-rx-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { name: selectMany.name }

/**
 * @description Create an `IObservable` that raises an error.
 * @param error The error to raise.
 * @returns Returns `IObservable` that raises `error`.
 */
function throws(error = null) {
  return create(function(observer) {
    observer[Error](error)
  }, Options)
}

module.exports = throws