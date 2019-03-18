var { 
  os,
  rxjs: { Subject, Observable },
  ['@kingjs']: { reflect: { is } },
} = require('../dependencies');

var sleep = require('../sleep');

function pollingObservable(poll, interval, finished) {

  return new Observable(subscriber => {
    process.nextTick(() => {
      if (finished())
        break;

      subscriber.next(poll);

      await sleep(interval);
    });
  })
}

module.exports = pollingObservable;