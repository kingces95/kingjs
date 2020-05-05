var sleep = require('./sleep');

function pollUntil(predicate, period, timeout) {
  var start = Date.now();

  return new Promise(
    (resolve, reject) => {
      process.nextTick(async () => {
        while (predicate()) {
          if (timeout && Date.now() > start + timeout)
            reject();
          await sleep(period);
        }
        resolve();
      })
    }
  );
}

module.exports = pollUntil;