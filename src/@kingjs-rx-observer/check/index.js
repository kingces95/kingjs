var { assert,
  '@kingjs': {
    IObserver,
    IObserver: { Next, Complete, Error },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }

/**
 * @description Asserts an observers calls are orderly.
 * @this any The `IObserver`.
 * @returns Returns a proxy `IObserver` which intercepts and asserts
 * that the calls to the original `IObserver` are orderly.
 */
function check(options = EmptyObject) {
  var finished = false
  var { assertAsync } = options
  
  var nextTick = false
  if (assertAsync)
    process.nextTick(() => nextTick = true)

  return {
    [Next]: o => { 
      assert.ok(!assertAsync || nextTick)
      assert.ok(!finished) 
      this[Next](o)
    },
    [Complete]: () => {
      assert.ok(!assertAsync || nextTick)
      assert.ok(!finished) 
      this[Complete]()
      finished = true
    },
    [Error]: e => {
      assert.ok(!assertAsync || nextTick)
      assert.ok(!finished) 
      this[Error](e)
      finished = true
    }
  }
}

module[ExportExtension](IObserver, check)
