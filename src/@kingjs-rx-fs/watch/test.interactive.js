var { readline, assert, ChildProcess,
  '@kingjs': {
    IObservable, 
    IObservable: { Subscribe },
    IObserver,
    IObserver: { Next, Complete },
    '-rx': {
      '-subject': { Subject },
      '-sync': { Select, Where },
      '-path': { Materialize },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

//process.chdir('.temp')
//process.chdir('../..')

var subject = new Subject()

assert.ok(subject instanceof IObservable)
assert.ok(subject instanceof IObserver)

// https://github.com/microsoft/vscode/issues/75253
process.execArgv[0] = '--inspect-brk'
var cp = ChildProcess.fork('test.child.js')

subject
  [Watch]()
  [Materialize]()
  [Where](o => o.value && o.value.name == 'package.json')
  //[Select](o => JSON.stringify(o))
  [Select](o => o.toString())
  [Subscribe](o => cp.send(o))

subject[Next]()

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  subject[Complete]()
  rl.close()
})
