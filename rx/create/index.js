var {
  ['@kingjs']: { 
    rx: { Subject },
    Generator,
    IObserver: { Next, Complete, Error }
  },
} = require('./dependencies');

function create(observer) {
  
  // create(function* () { ... }) => create(callback)
  if (observer instanceof Generator) {
    var generator = observer;
  
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

  return new Subject(observer);
}

module.exports = create;