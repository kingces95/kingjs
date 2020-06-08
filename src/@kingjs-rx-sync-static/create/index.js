var { assert,
  '@kingjs': {
    IObserver: { Initialize },
    IObservable: { Subscribe },
    '-rx-observer': { create: createObserver, Check }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Returns an object that implements `IObservable` using
 * the provided `subscribe` callback. 
 * 
 * @param subscribe The implementation of `Subscribe`.
 * @param [cancel] Cancels the subscription.
 * 
 * @callback subscribe
 * @param observer A partial implementation of `IObserver` as an object
 * or as arguments `Next`, `Complete`, and `Error`.
 * 
 * @remarks When `cancel` is provided, then `subscribe` need not call 
 * `Initialize` on its `IObserver`.
 */
function create(subscribe, cancel) {
  assert(subscribe)
  
  return {
    [Subscribe]() {
      var observer = createObserver(...arguments)
      var checkedObserver = observer[Check]()

      // subscribe is responsible for calling `Initialize`
      if (!cancel) 
        return subscribe(checkedObserver)
      
      // create is responsible for calling `Initialize`
      var aborted = false
      var cancelProxy = () => aborted = true  
      checkedObserver[Initialize](() => cancelProxy())
      if (aborted)
        return cancelProxy

      cancelProxy = cancel
      subscribe(checkedObserver)
      return cancel
    }
  }
}

module.exports = create