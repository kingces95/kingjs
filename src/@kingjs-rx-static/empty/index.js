var {
  '@kingjs': {
    IObserver: { Complete },
    '-rx-static': { create },
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asynchronously complete.
 * @returns A cancellation function.
 */
function empty() {
  return create(function*(observer) {
    observer[Complete]()
  })
}

module.exports = empty