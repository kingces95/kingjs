var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Initialize, Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts an observers calls are orderly.
 * @this any The `IObserver`.
 * @returns Returns a proxy `IObserver` which intercepts and asserts
 * that the calls to the original `IObserver` are orderly.
 */
function check() {
  var initialized = false
  var finished = false
  
  return {
    [Initialize]: (o) => {
      assert.ok(!initialized)
      assert.ok(o instanceof Function)
      initialized = true
      this[Initialize](o)
    },
    [Next]: (o) => {
      assert.ok(initialized)
      assert.ok(!finished) 
      this[Next](o)
    },
    [Complete]: () => {
      assert.ok(initialized)
      assert.ok(!finished) 
      this[Complete]()
      finished = true
    },
    [Error]: e => {
      assert.ok(initialized)
      assert.ok(!finished) 
      this[Error](e)
      finished = true
    }
  }
}

module[ExportExtension](IObserver, check)
