var {
  assert,
  events: { EventEmitter },
  ['@kingjs']: { 
    reflect: { is },
    rx: {
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error }
    }
  },
} = require('./dependencies')

var NextEvent = 'next'
var CompleteEvent = 'complete'
var ErrorEvent = 'error'
var SubscribeEvent = 'subscribe'
var DisposedError = 'This subject has been disposed.'

var DefaultNext = x => undefined
var DefaultComplete = () => undefined
var DefaultOnSubscribe = x => undefined
var throwNextTick = x => process.nextTick(() => { throw x })

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
    this.activate = activate
    this.on(SubscribeEvent, onSubscribe)
  }

  assertCanEmit() { 
    assert(!this.disposed, 'cannot emit') 
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
    this.epitaph = Complete
    this.disposed = true
  }
  [Error](x) { 
    this.assertCanEmit() 
    super.emit(ErrorEvent, x) 
    this.epitaph = Error
    this.error = x
    this.disposed = true
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
      if (this.disposed)
        return

      this.off(NextEvent, tryNext)
      this.off(CompleteEvent, tryComplete)
      this.off(ErrorEvent, tryError)

      if (this.listenerCount(NextEvent))
        return

      // dispose
      if (this.dispose)
        this.dispose()
      this.disposed = true

      if (this.epitaph)
        return

      // ungraceful shutdown
      this.epitaph = Error
      this.error = DisposedError
    }

    if (this.disposed) {
      
      // error epilog
      if (this.epitaph == Error) {
        (error || throwNextTick)(this.error)
        return
      }

      // async epilog
      assert(this.epitaph == Complete)
      super.emit(SubscribeEvent, tryNext, true) 
      tryComplete()
      return
    }

    // subscribe
    this.on(NextEvent, tryNext)
    this.on(CompleteEvent, tryComplete)
    this.on(ErrorEvent, tryError)
    super.emit(SubscribeEvent, tryNext, false)

    if (this.activate && !this.dispose)
      this.dispose = this.activate(this)

    return unsubscribe
  }
}

module.exports = Subject