var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-function': { Rename },
    '-rx-observer': { create: createObserver, Check }
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { }
var Epilog = 'Epilog'

/**
 * @description Returns an object that implements `IObservable` using
 * the provided `subscribe` callback. 
 * 
 * @param generator A callback that emits events via a supplied `IObserver`.
 * @param [cancel] Cancels the subscription.
 * 
 * @callback generator
 * @param observer The `IObserver` to raise events with.
 * @returns A cancel function or, if synchronous, undefined which is
 * replaced by `assert.fail`.
 */
function create(generator, options = Options) {
  assert(generator)
  var { name } = options

  if (name)
    generator[Rename](name)

  var result = {
    [Subscribe]() {
      var observer = createObserver(...arguments)
      var checkedObserver = observer[Check]()
      var cancel = generator(checkedObserver)
      return cancel || (() => assert.fail(`Cannot cancel a finalized ${name || 'IObservable'}.`))
    }
  }

  if (name)
    result[Subscribe][Rename](`${name} [${Epilog}]`)
  return result
}

module.exports = create