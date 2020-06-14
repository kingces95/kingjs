var { fs,
  '@kingjs': {
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-observer': { Proxy, Check },
      '-sync-static': { create }
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
 * @description Watch `Path` for events.
 * @this Path The `Path` to watch.
 * @returns Returns an `IObservable` that emits `Path` when the
 * files system watcher detects a change at that path.
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

module[ExportExtension](IObservable, watch)