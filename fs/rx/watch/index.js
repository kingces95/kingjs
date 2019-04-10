var { 
  assert, fs, path: Path,
  ['@kingjs']: {
    path: { makeAbsolute },
    rx: { 
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver : { Next, Complete, Error }
    },
    reflect: { 
      exportExtension
    },
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
function watch(path = '.', emitFirst) {
  return create(observer => {
    path = makeAbsolute(path);

    if (emitFirst)
      observer[Next](path);

    var watcher = fs.watch(path, Options);
    watcher.on(Event.Change, () => observer[Next](path));
    watcher.on(Event.Close, () => observer[Complete]());
    watcher.on(Event.Error, e => observer[Error](e));

    return () => {
      observer = Sink;
      watcher.close();
    }
  });
}

module.exports = watch;