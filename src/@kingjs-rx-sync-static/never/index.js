var { 
  '@kingjs': {
    IObserver: { Subscribed },
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }
var Options = { name: 'never' }

/**
 * @description Emits nothing.
 * @returns Returns `IObservable` that emits nothing.
 */
function never() {
  return create(observer => {
    observer[Subscribed](Noop)
  }, Options)
}

module.exports = never