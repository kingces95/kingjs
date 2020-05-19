var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx-observer': { create: createObserver, Checked }
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => undefined

/**
 * @description Returns an object that implements `IObservable` using
 * the provided `subscribe` callback. 
 * 
 * @param {*} subscribe The subscribe implementation.
 * 
 * @callback subscribe
 * @param observer A pojo with properties `Next`, `Complete`, 
 * and/or `Error`.
 * 
 * @remarks Defaults are provided for missing `Next`, `Complete`, 
 * and/or `Error` handlers.
 */
function create(subscribe) {
  assert(subscribe)

  return {
    [Subscribe]() {
      var observer = createObserver(...arguments)
      var checkedObserver = observer[Checked]()
      return subscribe(checkedObserver) || Noop
    }
  }
}

module.exports = create