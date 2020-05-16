var {
  '@kingjs': { 
    IObservable,
    IObservable: { Subscribe },
    '-module': { ExportShim },
    '-promise': { ToObservable },
  },
} = module[require('@kingjs-module/dependencies')]()

var Observable = Symbol('@kingjs/shim.promise.observable')

module[ExportShim](IObservable, Promise, {
  subscribe() {

    // wrap the promise in an observable and attach it to the promise
    var observable = this[Observable]
    if (!observable)
      this[Observable] = observable = this[ToObservable]()

    // thunk calls to subscribe to the observable wrapping this promise
    return observable[Subscribe].apply(observable, arguments)
  }
})
