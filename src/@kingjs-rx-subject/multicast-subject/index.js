var { assert, events: { EventEmitter },
  '@kingjs': { 
    IObserver,
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-reflect': { is },
  },
} = module[require('@kingjs-module/dependencies')]()

var NextEvent = 'next'
var CompleteEvent = 'complete'
var ErrorEvent = 'error'
var SubscribeEvent = 'subscribe'
var DisposedException = 'This subject has been disposed.'

var DefaultNext = x => undefined
var DefaultComplete = () => undefined
var DefaultOnSubscribe = x => undefined
var throwNextTick = x => process.nextTick(() => { throw x })
var Noop = () => undefined

var Activate = Symbol('activate')
var Disposed = Symbol('disposed')
var Dispose = Symbol('dispose')
var Epitaph = Symbol('epitaph')
var Exception = Symbol('exception')

/**
 * @description The Subject.
 * 
 * @remarks - All `IObservable`s are `Subject`s
 * @remarks - All `Subject`s are ref-counted. When the last
 * subscription is removed, the `Subject` disposes itself.
 */
class Subject extends EventEmitter {

  constructor(
    activate,
    onSubscribe) {

    super()
    this[Activate] = activate
    this.on(SubscribeEvent, onSubscribe)
  }

  assertCanEmit() { 
    assert(!this[Disposed], 'cannot emit') 
  }

  on(name, listener) { if (listener) super.on(name, listener) }
  off(name, listener) { if (listener) super.off(name, listener) }

  // IObserver
  [IObserver.Next](x) { 
    this.assertCanEmit() 
    super.emit(NextEvent, x) 
  }
  
  [IObserver.Complete]() { 
    this.assertCanEmit() 
    super.emit(CompleteEvent) 
    this[Epitaph] = Complete
    this[Disposed] = true
  }
  
  [IObserver.Error](x) { 
    this.assertCanEmit() 
    super.emit(ErrorEvent, x) 
    this[Epitaph] = Error
    this[Exception] = x
    this[Disposed] = true
  }

  // IObservable
  [IObservable.Subscribe](
    next = DefaultNext, 
    complete = DefaultComplete, 
    error) {

    // overload: subscribe(observer) -> subscribe(next, complete, error)
    if (is.object(next)) {
      var observer = next
      return this[Subscribe](
        observer[Next].bind(observer), 
        observer[Complete].bind(observer), 
        observer[Error].bind(observer)
      )
    }

    // if an exception is thrown when reporting any type of observation, 
    // then unsubscribe from the observer. Always unsubscribe from an observer
    // after reporting a completio or error.
    var tryNext = x => { 
      try { 
        next(x) 
      } 
      catch(e) { 
        throwNextTick(e) 
        unsubscribe() 
      } 
    }

    var tryComplete = () => { 
      try { 
        complete()
      } 
      catch(e) { 
        throwNextTick(e) 
      }
      unsubscribe() 
    }

    var tryError = !error ? null : x => { 
      try { 
        error(x) 
      } 
      catch(e) { 
        throwNextTick(e) 
      }
      unsubscribe()
    }

    // unsubscribe
    var unsubscribe = () => {

      // bail; never subscribed; epilog emission threw an exception
      if (this[Disposed])
        return

      this.off(NextEvent, tryNext)
      this.off(CompleteEvent, tryComplete)
      this.off(ErrorEvent, tryError)

      if (this.listenerCount(NextEvent))
        return

      // dispose
      if (this[Dispose])
        this[Dispose]()
      this[Disposed] = true

      if (this[Epitaph])
        return

      // ungraceful shutdown
      this[Epitaph] = Error
      this[Exception] = DisposedException
    }

    if (this[Disposed]) {
      
      // error epilog
      if (this[Epitaph] == Error) {
        (error || throwNextTick)(this[Exception])
        return Noop
      }

      // async epilog
      assert(this[Epitaph] == Complete)
      super.emit(SubscribeEvent, this, tryNext, true) 
      tryComplete()
      return Noop
    }

    // subscribe
    this.on(NextEvent, tryNext)
    this.on(CompleteEvent, tryComplete)
    this.on(ErrorEvent, tryError)

    super.emit(SubscribeEvent, this, tryNext, false)

    if (this[Activate] && !this[Dispose])
      this[Dispose] = this[Activate](this)

    return unsubscribe
  }
}

module.exports = Subject