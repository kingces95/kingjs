var {
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
var throwNextTick = x => process.nextTick(() => { throw x });
var defaultOptions = { };

/**
 * @description The description.
 */
class Subject extends EventEmitter {

  constructor(activate, options = defaultOptions) {
    super();
    this.activate = activate;
    this.options = options;
  }

  on(name, listener) { if (listener) super.on(name, listener); }
  off(name, listener) { if (listener) super.off(name, listener); }
  emit(name, event) { super.emit(name, event); }

  // IObserver
  [Next](x) { this.emit(NextEvent, x); }
  [Complete]() { this.emit(CompleteEvent); }
  [Error](x) { this.emit(ErrorEvent, x); }

  // IObservable
  [Subscribe](next = DefaultNext, complete, error) {

    // singleton
    if (!this.options.singleton) {
      var singleton = new Subject(this.activate, { 
        ...this.options,
        singleton: true 
      });
      return singleton[Subscribe](next, complete, error);
    }

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

      if (this.dispose && !this.listenerCount(NextEvent))
        this.dispose();
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