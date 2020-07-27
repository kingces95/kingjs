var { assert, readline,
  '@kingjs': {
    IObserver: { Next, Complete },
    IGroupedObservable: { Key, Subscribe },
    Path,
    '-fs': { Exists,
      '-dir': { Make, Remove },
      '-file': { Write, Unlink },
    },
    '-rx': {
      '-subject': { Subject, GroupedSubject },
      '-sync': { SubscribeAndAssert, Materialize, Do, Select, Rekey, Log, Where, Regroup,
        '-static': { counter },
      },
      '-fs': { WatchFiles }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var subject = new Subject(() => null)

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('SIGINT', () => {
  console.log('ctrl-c')
  subject[Complete]()
  rl.close()
})

function serialize(o) {
  var result = ''
  if (o.grouping) result += '+'
  if (o.complete) result +=  '-'
  if (o.next) result +=  'Δ'

  result += ' '
  result += o.keys[0].path.toString()

  return result
}

subject
  [WatchFiles](Path.dot, {
    selectWatcher: o => 
      [Watch]()
      [Debounce](debounceMs)
  })
  //[Where](o => o[Key].isFile)
  [Materialize]()
  [Select](o => serialize(o))
  [Subscribe](o => console.log(o))

subject[Next]()

// FileVersion, DirVersion, LinkVersion
// FileLink, DirLink, LinkLink