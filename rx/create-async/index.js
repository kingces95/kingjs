var {
  ['@kingjs']: { 
    promise: { sleep },
    rx: { create },
    IObserver: { Next, Complete, Error },
    Generator,
    AsyncGenerator
  },
} = require('./dependencies');

/**
 * 
 * @param {*} callback 
 * @param {*} interval 
 */
function createAsync(callback, interval) {
  var generator = callback;

  // createAsync(async function* () { ... }, interval) => createAsync(callback, interval)
  // createAsync(function* () { ... }, interval) => createAsync(callback, interval)
  if (callback instanceof Generator) {
    var generator = callback;
  
    return createAsync(async function(next) {
      var iterator = this.iterator;
  
      if (!iterator)
        iterator = this.iterator = generator();
  
      var current = await iterator.next();
      if (current.done)
        return false;
  
      next(current.value);
      return true;
    }, interval);
  }

  return create(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      var self = { };

      try {
        var next = observer[Next].bind(observer);

        while (true) {

          // inject delay
          await sleep(interval);

          // externally terminated
          if (cancelled)
            return;

          // yield value
          if (await callback.call(self, next) == false) {

            // self terminated
            observer[Complete]();
            break;
          }
        }
      } catch(e) { 
        observer[Error](e);
      }
    });

    return () => cancelled = true;
  });
}

module.exports = createAsync;