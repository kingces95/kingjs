var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts an observers calls are orderly.
 * @this any The `IObserver`.
 * @returns Returns a proxy `IObserver` which intercepts and asserts
 * that the calls to the original `IObserver` are orderly.
 */
function checked() {
  var finished = false

  return {
    [Next]: o => { 
      assert.ok(!finished) 
      this[Next](o)
    },
    [Complete]: () => {
      assert.ok(!finished) 
      this[Complete]()
      finished = true
    },
    [Error]: e => {
      assert.ok(!finished) 
      this[Error](e)
      finished = true
    }
  }
}

module[ExportExtension](IObserver, checked)
