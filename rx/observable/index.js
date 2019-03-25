var {
  events: { EventEmitter },
  ['@kingjs']: { 
    reflect: { is },
    IObservable,
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

var NextEvent = 'next';
var CompleteEvent = 'complete';
var ErrorEvent = 'error';

var DefaultNext = x => undefined;
var throwNextTick = x => process.nextTick(() => { throw x });

/**
 * @description The description.
 */
class Observable extends EventEmitter {

  constructor(activate, isSubject) {
    super();
    this.activate = activate;
    this.isSubject = isSubject;
  }

  on(name, listener) { if (listener) super.on(name, listener); }
  off(name, listener) { if (listener) super.off(name, listener); }
  emit(name, event) { super.emit(name, event); }

  [IObservable.subscribe](next, complete, error) { 
    return this.subscribe(next, complete, error) 
  }
  subscribe(next = DefaultNext, complete, error) {

    // singleton
    if (!this.isSubject) {
      var singleton = new Observable(this.activate, true);
      return singleton.subscribe(next, complete, error);
    }

    // subscribe(observer) -> subscribe(next, complete, error)
    if (is.object(next))
      return this.subscribe(next[Next], next[Complete], next[Error])

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

      if (this.dispose && !this.listenerCount(NextEvent))
        this.dispose();
    }

    if (!this.dispose) {
      this.dispose = this.activate({ 
        [Next]: x => this.emit(NextEvent, x),
        [Complete]: () => this.emit(CompleteEvent),
        [Error]: x => this.emit(ErrorEvent, x),
      });
    }

    return unsubscribe;
  }
}

module.exports = Observable;