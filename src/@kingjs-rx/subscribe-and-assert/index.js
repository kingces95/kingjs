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
function subscribeAndAssert(expectedNext, options = { }) {
  if (!expectedNext)
    expectedNext = [ ]

  var { error, unfinished } = options
  var finished = false

  var promise = new Promise(accept => {
    var acceptUnfinished = () => {
      if (expectedNext.length != 0)
        return
      
      if (unfinished) {
        finished = true
        assert.ok(cancel instanceof Function)
        accept(cancel)
      }
    }

    var cancel = this[Subscribe]({
      [Next](actualNext) {
        assert.ok(!finished)
        assert.deepEqual(actualNext, expectedNext.shift())
        acceptUnfinished()
      }, 
      [Complete]() {
        assert.ok(!unfinished)
        assert.ok(!finished)
        assert.ok(error === undefined)
        finished = true
        accept()
      }, 
      [Error](actualError) {
        assert.ok(!unfinished)
        assert.ok(!finished)
        assert.ok(error !== undefined)
        assert.equal(actualError, error)
        finished = true
        accept(actualError)
      }
    })
    
    acceptUnfinished()
  })

  return promise
}

module[ExportExtension](IObservable, subscribeAndAssert)
