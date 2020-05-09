var {
  '@kingjs': { 
    reflect: { implementInterface },
    promise: { ToObservable },
    rx: {
      IObservable,
      IObservable: { Subscribe }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

var Observable = Symbol('@kingjs/shim.promise.observable')

implementInterface(
  Promise.prototype, 
  IObservable, {
    subscribe() {

      // wrap the promise in an observable and attach it to the promise
      var observable = this[Observable]
      if (!observable)
        this[Observable] = observable = this[ToObservable]()

      // thunk calls to subscribe to the observable wrapping this promise
      return observable[Subscribe].apply(observable, arguments)
    }
  }
)
