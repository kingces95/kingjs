var { assert,
  '@kingjs': {
    Path,
    IObservable: { Subscribe },
    '-fs': { Exists,
      '-dir': { Make, Remove, Write },
      '-file': { Overwrite },
    },
    '-rx': {
      '-sync': { SubscribeAndAssert, Do, Select,
        '-static': { of, never },
      },
      '-path': { Materialize },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var dot = Path.dot

var acme = 'acme'

var root = dot.to(acme)
if (root[Exists]())
  root[Remove]()

root[Make]()
process.chdir(root.toString())

var foo = dot[Write]('f')

never()
  [Watch]()
  [Materialize]()
  [Select](o => o.toString())
  [Subscribe](o => console.log(o))
return

of(() => foo[Overwrite]())
  [Do](o => o())
  [Watch]()
  // [Rekey](o => {
  //   assert.equal(o.name, o.path.name)
  //   assert.equal(o.type, Kind.File)
  //   return o.path.toString()
  // })
  [Materialize]()
  //[Select](o => serialize(o))
  //[Subscribe]()
  [Subscribe](o => console.log(o.toString()))
  //[SubscribeAndAssert](expected)
return

var expected = [ 
  '+f', 'Δf0', 
  'Δf1', 
  '+d/b', 'Δd/b2', 'Δf2', 
  '-d/b', 'Δf3', 
  '-f', '-' 
]

process.chdir('..')
root[Remove]()

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