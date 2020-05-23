var { fs,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { create,
      '-fs': { PathSubject },
    },
    '-interface': { ExportExtension },
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
 * @description Emit whenever a change happens to the content of a directory.
 * @this Path The `PathSubject` of the directory to watch.
 * @returns Returns an `IObservable` that emits undefined when the content
 * of the directory changes. 
 * 
 * @remarks - The watcher keeps the process alive until completed.
 **/
function watch() {

  return create(observer => {
    var watcher = fs.watch(this.path, Options)

    watcher.on(Event.Change, 
      () => observer[Next]()
    )
    watcher.on(Event.Close,
      () => watcher.removeAllListeners()
    )
    watcher.on(Event.Error, 
      e => observer[Error](e)
    )

    return this[Subscribe]({
      [Next](o) { 
        observer[Next](o) 
      },
      [Complete]() {
        watcher.close()
        observer[Complete]()
      },
      [Error](e) { 
        observer[Error](e) 
      }
    })
  })
}

module[ExportExtension](PathSubject, watch);