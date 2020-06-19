var { 
  '@kingjs': { IObserver: { Subscribed, Complete },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }
var Options = { name: empty.name }

/**
 * @description Create an `IObservable` that completes.
 * @returns Returns `IObservable` that completes.
 */
function empty() {
  return create(observer => {
    observer[Subscribed](Noop)
    observer[Complete]()
  }, Options)
}

module.exports = empty