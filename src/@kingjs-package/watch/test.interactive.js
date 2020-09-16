var { readline, assert,
  '@kingjs': {
    IObservable, 
    IObservable: { Subscribe },
    IObserver,
    IObserver: { Next, Complete },
    '-rx': {
      '-subject': { Subject },
      '-sync': { Select },
      '-path': { Materialize },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.chdir('acme')

var subject = new Subject()

assert.ok(subject instanceof IObservable)
assert.ok(subject instanceof IObserver)

subject
  [Watch]()
  [Materialize]()
  [Select](o => o.toString())
  [Subscribe](o => console.log(o))

subject[Next]()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  subject[Complete]()
  rl.close()
})