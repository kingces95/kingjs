var {
  assert, events: { EventEmitter }
} = require('./dependencies');

var Next = 'next';
var Error = 'error';
var Complete = 'complete';

var defaultError = e => undefined;
var defaultNext = x => undefined;
var defaultComplete = () => undefined;
var defaultDispose = () => undefined;

var throwNextTick = x => process.nextTick(() => { throw x });

var defaultOptions = { };

/**
 * @description The description.
 */
class Observable {

  constructor(activate, options = defaultOptions) {
    this.activate = activate;
    this.options = options;
  }

  static activateEmitter(activate) {

    var emitter = new EventEmitter();
    
    emitter.refs = 0;
    
    var next = x => {
      try { emitter.emit(Next, x) }
      catch (e) { 
        throwNextTick(e); 
        unsubscribe(); 
      }
    };

    var error = x => {
      try { emitter.emit(Error, x) }
      catch(e) { throwNextTick(e); }
      unsubscribe();
    };

    var complete = () => {
      try { emitter.emit(Complete, x) }
      catch(e) { throwNextTick(e); }
      unsubscribe();
    };

    emitter.dispose = activate({ next, error, complete }) || defaultDispose;

    return emitter;
  }

  getOrActivateEmitter() {
    if (!this.options.singleton)
      return activateEmitter(this.activate);

    if (!this.emitter)
      this.emitter = activateEmitter(this.activate);

    return this.emitter;
  }

  subscribe(observer) {
    var { 
      next = defaultNext, 
      error = defaultError, 
      complete = defaultComplete
    } = observer;

    var emitter = this.getOrActivateEmitter();

    // subscribe
    emitter
      .on(Next, next)
      .on(Error, error)
      .on(Complete, complete);
    emitter.refs ++; 

    // lazy unsubscribe
    var unsubscribe = () => {
      emitter.off(Next, next);
      emitter.off(Error, error);
      emitter.off(Complete, complete);

      emitter.refs --; 
      if (!emitter.refs)
        emitter.dispose();
    }

    return unsubscribe;
  }
}

module.exports = Observable;