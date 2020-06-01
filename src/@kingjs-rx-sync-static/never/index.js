var { 
  '@kingjs': {
    '-rx-sync-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Emits nothing.
 * @returns Returns `IObservable` that emits nothing.
 */
function never() {
  return create(function(observer) {
  })
}

module.exports = never