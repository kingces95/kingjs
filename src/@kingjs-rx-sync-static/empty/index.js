var { 
  '@kingjs': { IObserver: { Complete },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }

/**
 * @description Create an `IObservable` that completes.
 * @returns Returns `IObservable` that completes.
 */
function empty() {
  return create(function(observer) {
    observer[Complete]()
  }, Noop)
}

module.exports = empty