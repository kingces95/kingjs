var { readline,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    IObserver: { Next, Error },
    '-rx': { Debounce,
      '-subject': { Subject },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var DebounceMs = 60

process.nextTick(async () =>{

  var subject = new Subject()
  subject
    [Watch](Path.parse(__filename))
    [Debounce](DebounceMs)
    [Subscribe]({
      [Next]() { process.stdout.write('.') }
    })

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('SIGINT', () => {
    subject[Error]()
    rl.close()
  })
})