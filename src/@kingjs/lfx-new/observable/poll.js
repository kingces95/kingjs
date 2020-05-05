var { 
  os,
  rxjs: { Subject, Observable },
  ['@kingjs']: { reflect: { is } },
} = require('../dependencies');

var sleep = require('../promise/sleep');

function pollingObservable(poll, interval, finished) {

  return new Observable(subscriber => {
    process.nextTick(async () => {
      if (finished())
        break;

      subscriber.next(poll);

      await sleep(interval);
    });
  })
}

module.exports = pollingObservable;