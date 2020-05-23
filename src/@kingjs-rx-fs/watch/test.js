var {
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next },
    '-rx': { Debounce,
      '-fs': { watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var DebounceMs = 60

process.nextTick(async () => {
  var cwd = Path.dot.to('test.js')
  var watcher = watch(cwd)
  var stopWatching = watcher
    [Debounce](DebounceMs)
    [Subscribe]({
      [Next](path) { console.log(path) }
    })
})