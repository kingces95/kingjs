var { 
  fs,
  ['@kingjs']: {
    fs: { rx: { PathSubject } },
    rx: {
      create,
      IObservable: { Subscribe },
      IObserver: { Next, Complete, Error },
    },
    reflect: { exportExtension },
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
function watch() {

  return create(observer => {
    var watcher = fs.watch(this.path, Options)

    watcher.on(Event.Change, 
      () => observer[Next]()
    )
    watcher.on(Event.Close, () => {
      watcher.removeAllListeners();
      observer[Complete]()
    })
    watcher.on(Event.Error, 
      e => observer[Error](e)
    )

    var close = () => watcher.close();
    var dispose = this[Subscribe](
      o => observer[Next](o),
      () => {
        close()
        observer[Complete]()
      },
      e => observer[Error](e)
    )

    return () => {
      close()
      dispose()
    }
  })
}

exportExtension(module, PathSubject, watch);