var { 
  '@kingjs': { IObserver: { Complete },
    '-rx-static': { create },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Create an `IObservable` that completes.
 * @returns Returns `IObservable` that completes.
 */
function empty() {
  return create(function(observer) {
    observer[Complete]()
  })
}

module.exports = empty