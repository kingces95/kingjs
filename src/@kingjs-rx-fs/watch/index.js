var { fs,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { Proxy, Check },
      '-sync-static': { create }
    },
    '-module': { ExportInterfaceExtension },
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
 * @description Blends file system change events into the event stream.
 * @this Path The path to watch for changes.
 * @returns Returns an `IObservable` that blends `null` into the
 * event stream whenever the files system watcher detects a change 
 * at `path`.
 * 
 * @remarks The watcher keeps the process alive until completed.
 **/
function watch(path) {

  return create(observer => {
    var watcher = fs.watch(path.buffer, Options)

    watcher.on(Event.Change, 
      () => observer[Next](null)
    )
    watcher.on(Event.Close,
      () => watcher.removeAllListeners()
    )
    watcher.on(Event.Error, 
      e => {
        observer[Error](e)
        cancel()
      }
    )

    var cancel = this[Subscribe](
      observer[Proxy]({
        [Complete]() {
          watcher.close()
          this[Complete]()
        },
        [Error](e) {
          watcher.close()
          this[Error](e)
        }
      })
    )

    return () => {
      cancel()
      watcher.close()
    }
  })
}

module[ExportInterfaceExtension](IObservable, watch)