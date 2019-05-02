var { 
  fs,
  ['@kingjs']: {
    path: { makeAbsolute },
    rx: {
      create,
      IObservable,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
    }
  }
} = require('./dependencies')

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

var DefaultPath = '.'

/**
 * @description Watch a path.
 * 
 * @param [path] The path to watch. Default is the current working directory.
 * @param [observable] An observable whose completion signals stop watching.
 * 
 * @returns Returns an `IObservable` that emits `null` whenever the content
 * of the path changes. 
 * 
 * @remarks - The watcher keeps the process alive until completed.
 **/
function watch(
  path = DefaultPath,
  observable = null
) {

  path = makeAbsolute(path)

  var watcher = fs.watch(path, Options)

  var dispose = () => watcher.close()
  if (observable)
    observable[Subscribe](null, dispose, dispose)

  return create(observer => {
    watcher.on(Event.Change, () => observer[Next]())
    watcher.on(Event.Close, () => {
      watcher.removeAllListeners();
      observer[Complete]()
    })
    watcher.on(Event.Error, e => observer[Error](e))
  })
}

module.exports = watch
