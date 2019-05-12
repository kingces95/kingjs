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

var DefaultCreateObservable = o => o

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
    createObservable = DefaultCreateObservable,
    observer = new Subject()) {

    assert(observer)
    this[RealObserver] = observer

    var observable = createObservable(observer)
    assert(observer)
    this[RealObservable] = observable
  }

  // IObserver
  [Next](o) {
    this[RealObserver][Next](o)
  }
  [Complete]() { 
    this[RealObserver][Complete]()
  }
  [Error](e) { 
    this[RealObserver][Error](e)
  }

  // IObservable
  [Subscribe](
    next, 
    complete, 
    error) {

    var observable = this[RealObservable]
    return observable[Subscribe].apply(observable, arguments)
  }
}

module.exports = ProxySubject