var {
  assert,
  events: { EventEmitter },
  '@kingjs': { 
    reflect: { 
      is,
      createSymbol
    },
    rx: {
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    }
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

var Activate = createSymbol(module, 'activate')
var Disposed = createSymbol(module, 'disposed')
var Dispose = createSymbol(module, 'dispose')
var Epitaph = createSymbol(module, 'epitaph')
var Exception = createSymbol(module, 'exception')

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
  [Next](x) { 
    this.assertCanEmit() 
    super.emit(NextEvent, x) 
  }
  [Complete]() { 
    this.assertCanEmit() 
    super.emit(CompleteEvent) 
    this[Epitaph] = Complete
    this[Disposed] = true
  }
  [Error](x) { 
    this.assertCanEmit() 
    super.emit(ErrorEvent, x) 
    this[Epitaph] = Error
    this[Exception] = x
    this[Disposed] = true
  }

  // IObservable
  [Subscribe](
    next = DefaultNext, 
    complete = DefaultComplete, 
    error) {

    if (!next)
      next = DefaultNext

    if (!complete)
      complete = DefaultComplete

    // subscribe(observer) -> subscribe(next, complete, error)
    if (is.object(next)) {
      var observer = next
      return this[Subscribe](
        observer[Next].bind(observer), 
        observer[Complete].bind(observer), 
        observer[Error].bind(observer)
      )
    }

    // declare event handlers
    var tryNext = x => { 
      try { next(x) } 
      catch(e) { 
        throwNextTick(e) 
        unsubscribe() 
      } 
    }

    var tryComplete = !complete ? null : () => { 
      try { complete() } 
      catch(e) { throwNextTick(e) }
      unsubscribe() 
    }

    var tryError = !error ? null : x => { 
      try { error(x) } 
      catch(e) { throwNextTick(e) }
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