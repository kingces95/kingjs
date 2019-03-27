var {
  ['@kingjs']: { 
    rx: { Subject },
    Generator,
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

function createSync(callback) {
  
  // create(function* () { ... }) => create(callback)
  if (callback instanceof Generator)
    return fromGenerator(); 

  return new Subject(callback);
}

function fromGenerator(generator) {
  return createSync(function(observer) {
    try {
      for (var o of generator())
        observer[Next](o);
      observer[Complete]();
    } catch(e) { 
      observer[Error](e);
    }
  });
}

module.exports = createSync;