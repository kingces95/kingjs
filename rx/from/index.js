var { 
  assert,
  ['@kingjs']: {
    reflect: { is },
    rx: { create },
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

/**
 * @description Create an `IObservable` from a generator or 
 * implementor of the iterator protocol.
 * 
 * @param value `foo` comment.
 * 
 * @returns Returns `IObservable` that emits elements in value.
 * 
 * @remarks As all values are emitted synchronously, this is primarily
 * a toy or testing tool with limited practical use otherwise.
 */
function from(value) {

  // arrays, maps, etc...
  if (Symbol.iterator in value)
    return fromGenerator(value[Symbol.iterator].bind(value))
    
  // function* () { ... }
  if (is.generator(value))
    return fromGenerator(value); 

  assert.fail();
}

function fromGenerator(generator) {
  return create(function(observer) {
    try {
      for (var o of generator())
        observer[Next](o);
      observer[Complete]();
    } catch(e) { 
      observer[Error](e);
    }
  });
}

module.exports = from;