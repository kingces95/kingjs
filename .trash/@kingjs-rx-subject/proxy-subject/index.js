var {
  assert,
  '@kingjs': { 
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-reflect': { createSymbol },
    '-rx': { Subject }
  },
} = module[require('@kingjs-module/dependencies')]()

var CreateSubject = createSymbol(module, 'create-subject')
var Activate = createSymbol(module, 'activate')
var RealObserver = createSymbol(module, 'real-observer')
var RealObservable = createSymbol(module, 'real-observable')
var Subscribed = createSymbol(module, 'initialize')

var DefaultActivate = o => o
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

  static get Activate() {
    return Activate
  }
  static get CreateSubject() {
    return CreateSubject
  }

  constructor(
    createSubject = DefaultCreateSubject,
    activate = DefaultActivate) {

    this[CreateSubject] = createSubject
    this[Activate] = activate
  }

  [Subscribed]() {
    var createSubject = this[CreateSubject]
    var activate = this[Activate]

    var subject = createSubject(this)
    assert(subject)
    this[RealObserver] = subject

    var observable = activate(subject)
    assert(observable)
    this[RealObservable] = observable

    return observable
  }

  // IObserver
  [Next](o) {
    if (!this[RealObserver])
      return
    this[RealObserver][Next](o)
  }
  [Complete]() { 
    if (!this[RealObserver])
      this[Subscribed]()
    this[RealObserver][Complete]()
  }
  [Error](e) { 
    if (!this[RealObserver])
      this[Subscribed]()
    this[RealObserver][Error](e)
  }

  // IObservable
  [Subscribe]() {
    var observable = this[RealObservable]
    if (!observable)
      observable = this[Subscribed]()

    return observable[Subscribe].apply(observable, arguments)
  }
}

module.exports = ProxySubject