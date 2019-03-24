var {
  assert, events: { EventEmitter },
  ['@kingjs']: { reflect: { is } }
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

  subscribe(next = DefaultNext, complete, error) {

    // singleton
    if (!this.isSubject) {
      var singleton = new Observable(this.activate, true);
      return singleton.subscribe(next, complete, error);
    }

    // subscribe(observer) -> subscribe(next, complete, error)
    if (is.object(next))
      return this.subscribe(next.next, next.complete, next.error)

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
        next: x => this.emit(NextEvent, x),
        complete: () => this.emit(CompleteEvent),
        error: x => this.emit(ErrorEvent, x),
      });
    }

    return unsubscribe;
  }
}

module.exports = Observable;