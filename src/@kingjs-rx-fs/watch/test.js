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

process.nextTick(async () =>
  watch(Path.parse(__filename))
    [Debounce](DebounceMs)
    [Subscribe]({
      [Next]() { process.stdout.write('.') }
    })
)