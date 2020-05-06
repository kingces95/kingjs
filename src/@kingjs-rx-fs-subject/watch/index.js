var {
  assert, 
  fs,
  '@kingjs': {
    rx: {
      BehaviorSubject,
      IObserver: { Next, Error },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

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
class WatchSubject extends BehaviorSubject {
  constructor(path) {
    assert(path)

    super(null, observer => {
      var watcher = fs.watch(path, Options)
  
      watcher.on(Event.Change, 
        () => observer[Next](null)
      )
      watcher.on(Event.Close,
        () => watcher.removeAllListeners()
      )
      watcher.on(Event.Error, 
        e => observer[Error](e)
      )
  
      return () => watcher.close()
    })
  }
}

module.exports = WatchSubject