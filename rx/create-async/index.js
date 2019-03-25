var {
  ['@kingjs']: { 
    promise: { sleep },
    rx: { create },
    IObserver: { Next, Complete, Error },
  },
} = require('./dependencies');

/**
 * 
 * @param {*} callback 
 * @param {*} interval 
 */
function createAsync(callback, interval) {

  return create(observer => {
    var cancelled = false;

    process.nextTick(async () => {
      var context = { };

      try {
        var next = observer[Next].bind(observer);

        while (true) {

          // inject delay
          await sleep(interval);

          // externally terminated
          if (cancelled)
            return;

          // yield value
          if (!callback.call(context, next)) {

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