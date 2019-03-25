var {
  assert,
  events: { EventEmitter },
  ['@kingjs']: { 
    reflect: { is },
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

var NextEvent = 'next';
var CompleteEvent = 'complete';
var ErrorEvent = 'error';

var DefaultNext = () => undefined;
var DefaultComplete = x => undefined;
var throwNextTick = x => process.nextTick(() => { throw x });

/**
 * @description The description.
 */
class Subject extends EventEmitter {

  constructor(activate) {
    super();
    this.activate = activate;
  }

  assertOk() { assert(!this.disposed) }

  on(name, listener) { if (listener) super.on(name, listener); }
  off(name, listener) { if (listener) super.off(name, listener); }
  emit(name, event) { super.emit(name, event); }

  // IObserver
  [Next](x) { 
    this.assertOk(); 
    this.emit(NextEvent, x); 
  }
  [Complete]() { 
    this.assertOk(); 
    this.emit(CompleteEvent); 
    this.disposed = true;
  }
  [Error](x) { 
    this.assertOk(); 
    this.emit(ErrorEvent, x); 
    this.disposed = true;
  }

  // IObservable
  [Subscribe](next = DefaultNext, complete = DefaultComplete, error) {

    this.assertOk();

    // subscribe(observer) -> subscribe(next, complete, error)
    if (is.object(next))
      return this[Subscribe](next[Next], next[Complete], next[Error])

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

      if (this.disposed)
        return;

      if (this.dispose && !this.listenerCount(NextEvent))
        this.dispose();

      this.disposed = true;
    }

    if (this.activate && !this.dispose) {
      this.dispose = this.activate({ 
        [Next]: x => this[Next](x),
        [Complete]: () => this[Complete](),
        [Error]: x => this[Error](x),
      });
    }

    return unsubscribe;
  }
}

module.exports = Subject;