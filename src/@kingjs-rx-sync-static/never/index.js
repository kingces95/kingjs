var { 
  '@kingjs': {
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }

/**
 * @description Emits nothing.
 * @returns Returns `IObservable` that emits nothing.
 */
function never() {
  return create(Noop, Noop)
}

module.exports = never