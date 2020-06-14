var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-string': { Capitalize },
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
  rename(generator, options.name)

  var result = {
    [Subscribe]() {
      var observer = createObserver(...arguments)
      var checkedObserver = observer[Check]()
      return generator(checkedObserver) || assert.fail
    }
  }

  rename(result[Subscribe], `${generator.name} [${Epilog}]`)
  return result
}

function rename(target, value) {
  if (!value)
    return

  Object.defineProperty(target, 'name', { value })
}


module.exports = create