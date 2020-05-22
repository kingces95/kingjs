var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
function subscribeAndAssert(expectedNext, options = {}) {
  if (!expectedNext)
    expectedNext = []

  var { error, unfinished } = options
  var finished = false

  var cancel = this[Subscribe]({
    [Next](actualNext) {
      assert.deepEqual(actualNext, expectedNext.shift())
    }, 
    [Complete]() {
      assert.ok(error === undefined)
      finished = true
    }, 
    [Error](actualError) {
      assert.ok(error !== undefined)
      assert.equal(actualError, error)
      finished = true
    }
  })

  assert.equal(expectedNext.length, 0)
  assert.equal(!unfinished, finished)
  assert.ok(cancel instanceof Function)

  return cancel
}

module[ExportExtension](IObservable, subscribeAndAssert)
