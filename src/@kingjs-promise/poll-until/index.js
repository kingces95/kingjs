var { 
  ['@kingjs-promise']: { sleep }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Return a promise fulfilled when `predicate`, polled
 * at `period`, returns `true`, or rejected after a timeout.
 * 
 * @param predicate Continue polling until this predicate returns true.
 * @param [interval] The period in milliseconds at which to poll the predicate.
 * @param [timeout] Time in milliseconds to reject the promise regardless
 * of predicate value.
 * 
 * @returns Returns a promise fulfilled after `predicate` returns `true` or 
 * rejected after `timeout`.
 * 
 * @remarks Under the hood, polling is done by looping inside of `process.nextTick`
 * until either `predicate` returns true or `timeout` as elapsed and `await`ing 
 * a `sleep`ing promise for `period`.
 */
function pollUntil(predicate, interval, timeout) {
  var start = Date.now();

  return new Promise(
    (resolve, reject) => {
      process.nextTick(async () => {
        while (true) {
          await sleep(interval);

          if (predicate())
            return resolve();

          if (timeout && Date.now() > start + timeout)
            return reject();
        }
      })
    }
  );
}

module.exports = pollUntil;