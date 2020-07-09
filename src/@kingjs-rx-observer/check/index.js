var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Subscribed, Next, Complete, Error },
    '-module': { ExportInterfaceExtension },
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
    [Subscribed]: (o) => {
      assert.ok(o instanceof Function)
      assert.ok(!initialized)
      initialized = true

      var cancelled = false
      this[Subscribed](() => { cancelled = true; o() })
      assert.ok(!cancelled)
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

module[ExportInterfaceExtension](IObserver, check)
