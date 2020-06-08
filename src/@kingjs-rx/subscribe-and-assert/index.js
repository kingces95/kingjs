var { assert,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Initialize, Next, Complete, Error },
    '-rx-observer': { Check },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

function Noop() { }

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
function subscribeAndAssert(expected, options = { }) {
  if (!expected)
    expected = [ ]

  var { 
    synchronous, 
    error, 
    terminate, 
    abort,
    abandon, 
    delay = 0 
  } = options

  // abandon is terminate without the `cancel` call
  if (abandon)
    terminate = true

  var start = Date.now()
  var eventsExpected = true

  function completeOrError() {
    assert.ok(eventsExpected)
    eventsExpected = false
    assert.ok(!terminate)
    assert.ok(!expected.length)
  }

  function tryCancel(cancel) {
    assert(cancel)
    
    if (expected.length) 
      return false

    eventsExpected = false
    cancel()
    return true
  }

  var test = accept => {
    var cancel
    var initialized = false

    this[Subscribe]({
      [Initialize]() {
        assert(!initialized)
        initialized = true
        
        cancel = arguments[0]
        if (abandon)
          cancel = Noop

        if (abort) {
          assert(tryCancel(cancel))
          accept()
        }
      },
      [Next](o) {
        assert.ok(eventsExpected)
  
        assert.ok(Date.now() - start >= delay)
        start = Date.now()
  
        assert.deepEqual(o, expected.shift())
        if (terminate && tryCancel(cancel))
          accept()
      }, 
      [Complete]() {
        completeOrError()
        assert.ok(error === undefined)
        accept()
      },
      [Error](o) {
        completeOrError()
        assert.ok(error !== undefined)
        assert.equal(o, error)
        accept()
      }
    })

    assert.ok(initialized)
    
    if (eventsExpected && terminate && tryCancel(cancel))
      accept()
  }

  if (synchronous) {
    var accepted = false
    test(() => accepted = true)
    assert.ok(accepted)
    return
  }

  return new Promise(test)
}

module[ExportExtension](IObservable, subscribeAndAssert)
