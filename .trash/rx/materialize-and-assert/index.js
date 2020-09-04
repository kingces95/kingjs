var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable,
    IObservable: { Subscribe },
    '-rx': {
      '-sync': { Materialize },
     },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
async function materializeAndAssert(args, options = EmptyObject) {
  var { 
    log, 
    async, 
    materialize = Materialize
  } = options
  
  var events = []

  this
    [materialize]()
    [Subscribe](o => events.push(o))

  for (arg of args) {
    var action = arg
    var expected = arg

    if (action instanceof Function) {
      assert(events.length == 0)

      var promise = action()
      if (async)
        await promise

      if (log)
        console.log(events)
      continue
    }

    var actual = events.shift()
    assert.deepEqual(expected, actual)
  }

  assert(events.length == 0)
}

module[ExportInterfaceExtension](IObservable, materializeAndAssert)