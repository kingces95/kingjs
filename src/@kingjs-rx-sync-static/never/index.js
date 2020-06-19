var { 
  '@kingjs': {
    IObserver: { Subscribed },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }
var Options = { name: never.name }

/**
 * @description Emits nothing.
 * @returns Returns `IObservable` that emits nothing.
 */
function never() {
  return create(observer => {
    observer[Subscribed](Noop)
    return Noop
  }, Options)
}

module.exports = never