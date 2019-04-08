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
} = require('./dependencies');

var NextEvent = 'next';
var CompleteEvent = 'complete';
var ErrorEvent = 'error';
var DisposedError = 'This subject has been disposed.'

var DefaultNext = () => undefined;
var DefaultComplete = x => undefined;
var throwNextTick = x => process.nextTick(() => { throw x });

/**
 * @description The Subject.
 * 
 * @remarks - All `IObservable`s are `Subject`s
 * @remarks - All `Subject`s are ref-counted. When the last
 * subscription is removed, the `Subject` disposes itself.
 */
class Subject extends EventEmitter {

  constructor(activate) {
    super();
    this.activate = activate;
  }

  assertCanEmit() { assert(!this.disposed) }

  on(name, listener) { if (listener) super.on(name, listener); }
  off(name, listener) { if (listener) super.off(name, listener); }
  emit(name, event) { super.emit(name, event); }

  // IObserver
  [Next](x) { 
    this.assertCanEmit(); 
    this.emit(NextEvent, x); 
  }
  [Complete]() { 
    this.assertCanEmit(); 
    this.emit(CompleteEvent); 
    this.epitaph = Complete;
    this.disposed = true;
  }
  [Error](x) { 
    this.assertCanEmit(); 
    this.emit(ErrorEvent, x); 
    this.epitaph = Error;
    this.error = x;
    this.disposed = true;
  }

  // IObservable
  [Subscribe](next = DefaultNext, complete = DefaultComplete, error) {

    if (!next)
      next = DefaultNext;

    if (!complete)
      complete = DefaultComplete;

    // subscribe(observer) -> subscribe(next, complete, error)
    if (is.object(next)) {
      var observer = next;
      return this[Subscribe](
        observer[Next].bind(observer), 
        observer[Complete].bind(observer), 
        observer[Error].bind(observer)
      )
    }

    // epilog
    if (this.disposed) {
      assert(this.epitaph == Complete || this.epitaph == Error);

      if (this.epitaph == Complete)
        complete(); 
      else if (error)
        error(this.error);
      else
        throwNextTick(this.error); 

      return;
    }

    // declare event handlers
    var tryNext = x => { 
      try { next(x) } 
      catch(e) { 
        throwNextTick(e); 
        unsubscribe(); 
      } 
    }

    var tryComplete = !complete ? null : () => { 
      try { complete() } 
      catch(e) { throwNextTick(e); }
      unsubscribe(); 
    }

    var tryError = !error ? null : x => { 
      try { error(x) } 
      catch(e) { throwNextTick(e); }
      unsubscribe();
    }

    // subscribe
    this.on(NextEvent, tryNext)
    this.on(CompleteEvent, tryComplete)
    this.on(ErrorEvent, tryError)

    // unsubscribe
    var unsubscribe = () => {
      this.off(NextEvent, tryNext);
      this.off(CompleteEvent, tryComplete);
      this.off(ErrorEvent, tryError);

      if (this.disposed || this.listenerCount(NextEvent))
        return;

      // dispose
      if (this.dispose)
        this.dispose();
      this.disposed = true;

      if (this.epitaph)
        return;
      this.epitaph = Error;
      this.error = DisposedError;
    }

    if (this.activate && !this.dispose)
      this.dispose = this.activate(this);

    return unsubscribe;
  }
}

module.exports = Subject;