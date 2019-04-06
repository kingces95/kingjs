var { 
  assert, fs,
  ['@kingjs']: {
    rx: { create },
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error }
  }
} = require('./dependencies');

var Event = {
  Change: 'change',
  Close: 'close',
  Error: 'error'
}

var Options = {
  persistent: true,
  recursive: false,
  encoding: 'utf8'
}

var Sink = {
  [Next]() { },
  [Complete]() { },
  [Error]() { },
}

/**
 * @description Watches a path until cancelled.
 * 
 * @param [path] The path to watch.
 * 
 * @returns Returns an `IObservable` which emits `next` when
 * a change to the path is observed and `error` with if the
 * watcher reports an error.
 * 
 * @remarks - No provision is made for typing the change that happened. 
 **/
function watch(path) {
  return create(observer => {
    var watcher = fs.watch(path, Options);

    watcher.on(Event.Error, e => observer[Error](e));
    watcher.on(Event.Close, () => observer[Complete]());
    watcher.on(Event.Change, () => observer[Next]());

    return () => {
      observer = Sink;
      watcher.close();
    }
  });
}

module.exports = watch;