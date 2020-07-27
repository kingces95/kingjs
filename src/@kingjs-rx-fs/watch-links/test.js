var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    Path,
    '-dir-entry': { DirEntry: { Dir }, Kind },
    '-fs': { Exists,
      '-dir': { Make, Remove },
      '-file': { Write, Unlink },
    },
    '-rx': {
      '-subject': { Subject, GroupedSubject },
      '-sync': { SubscribeAndAssert, Materialize, Do, Select, Rekey, Then, Log,
        '-static': { counter, from, of },
      },
      '-fs': { WatchLinks, Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var dot = Path.dot
var acme = dot.to('acme')

if (acme[Exists]())
  acme[Remove]()
acme[Make]()
process.chdir(acme.toString())

var dir = dot.to('d')
var foo = dot.to('f')
var bar = dir.to('b')

of(() => foo[Write](), () => dir[Make](), () => bar[Write]())
  [Do](o => o())
  [WatchLinks]()
  // [Rekey](o => {
  //   assert.equal(o.name, o.path.name)
  //   assert.equal(o.type, Kind.File)
  //   return o.path.toString()
  // })
  [Materialize]()
  //[Select](o => serialize(o))
  //[Subscribe]()
  [Subscribe](o => console.log(o))
  //[SubscribeAndAssert](expected)

var expected = [ 
  '+f', 'Δf0', 
  'Δf1', 
  '+d/b', 'Δd/b2', 'Δf2', 
  '-d/b', 'Δf3', 
  '-f', '-' 
]

process.chdir('..')
acme[Remove]()

// function serialize(o) {
//   var result = ''
//   if (o.grouping) result += '+'
//   if (o.complete) result +=  '-'
//   if (o.next) result +=  'Δ'

//   var keys = o.keys || []
//   result += keys.join('')
//   //if (o.next) result += o.value
//   return result
// }