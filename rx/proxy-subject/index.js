var {
  assert,
  ['@kingjs']: { 
    reflect: { 
      is,
      createSymbol
    },
    rx: {
      Subject,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    }
  },
} = require('./dependencies')

var RealObserver = createSymbol(module, 'real-observer')
var RealObservable = createSymbol(module, 'real-observable')
var Initialize = createSymbol(module, 'initialize')

var DefaultCreateObservable = o => o
var DefaultCreateSubject = o => new Subject()

/**
 * @description A class that that proxies events to
 * a private `IObserver` and subscribes clients to a 
 * private `IObservable`.
 * 
 * @param [createObservable] Creates  an `IObservable` given
 * `observer` to which subscriptions are proxied. Default is identity.
 * @param [observer] The observer to which events are proxied.
 */
class ProxySubject {

  constructor(
    createSubject = DefaultCreateSubject,
    createObservable = DefaultCreateObservable) {

    this[Initialize] = () => {

      var subject = createSubject(this)
      assert(subject)
      this[RealObserver] = subject
  
      var observable = createObservable(subject)
      assert(observable)
      this[RealObservable] = observable

      return observable
    }
  }

  // IObserver
  [Next](o) {
    if (!this[RealObserver])
      return
    this[RealObserver][Next](o)
  }
  [Complete]() { 
    if (!this[RealObserver])
      this[Initialize]()
    this[RealObserver][Complete]()
  }
  [Error](e) { 
    if (!this[RealObserver])
      this[Initialize]()
    this[RealObserver][Error](e)
  }

  // IObservable
  [Subscribe](
    next, 
    complete, 
    error) {

    var observable = this[RealObservable]
    if (!observable)
      observable = this[Initialize]()

    return observable[Subscribe].apply(observable, arguments)
  }
}

module.exports = ProxySubject