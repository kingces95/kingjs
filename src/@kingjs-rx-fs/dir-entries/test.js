var {
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    IGroupedObservable: { Key },
    '-rx': { Debounce,
      '-fs': { watch, DirEntries }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Ms = 100

var path = Path.parse(__dirname)

process.nextTick(async () =>
  watch(path)
    [Debounce](Ms)
    [DirEntries](path)
    [Subscribe]({
      [Next](o) { 
        var name = o[Key]
        console.log(`+ ${name}`)
        o[Subscribe]({
          [Next](x) { console.log(`Δ ${name}`); console.log(x) },
          [Complete]() { console.log(`- ${name}`) }
        })
      }
    }
  )
)
