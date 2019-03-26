var {
  ['@kingjs']: { 
    rx: { Subject },
    Generator,
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

function createSync(observer) {
  
  // create(function* () { ... }) => create(callback)
  if (observer instanceof Generator)
    return fromGenerator(); 

  return new Subject(observer);

  function fromGenerator() {
    var generator = observer;

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
}

module.exports = createSync;