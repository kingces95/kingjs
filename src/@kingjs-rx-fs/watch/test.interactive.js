var { assert, readline,
  '@kingjs': {
    IObserver: { Next, Complete },
    IGroupedObservable: { Key, Subscribe },
    '-fs-entity': { InoPath, InoVersionPath },
    '-rx': {
      '-subject': { Subject },
      '-sync': { 
        SubscribeAndAssert, Materialize, Do, Select, Rekey, Log, 
        Where, Regroup, WindowBy, DistinctUntilChanged,
        '-static': { counter },
      },
      '-fs': { WatchLinks, Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

//process.chdir('foo')

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

var i = 100
function serialize(o) {
  var result = `${i++}: `
  if (o.grouping) result += '+'
  if (o.complete) result +=  '-'
  if (o.next) result +=  'Δ'

  result += ' '
  result += o.keys[0].path.toString()

  if (o.keys.length > 1) {
    result += ' -> ino:' + o.keys[1].ino

    if (o.next)
      result += ', mtime:' + o.value.mtime
  }

  return result
}

subject
  [WatchLinks]()
  [Regroup](dirEntry => dirEntry
    [Select](o => InoPath.create(o))
    [WindowBy]()
    [Regroup](inoPath => inoPath
      [Select](o => InoVersionPath.create(o))
      [DistinctUntilChanged]()  
    )
  )
  [Materialize]()
  [Select](o => serialize(o))
  [Subscribe](o => console.log(o))

subject[Next]()

// FileVersion, DirVersion, LinkVersion
// FileLink, DirLink, LinkLink