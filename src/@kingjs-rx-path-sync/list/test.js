var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-reflect': { isString },
    '-rx': {
      '-subject': { Subject, SubjectProxy: Node },
      '-sync': { Select, Materialize, DistinctUntilChanged, Regroup },
      '-path-sync': { List },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

function serialize(o) {
  var { value, grouping, next, complete, keys } = o
  
  if (grouping) {
    assert.ok(!value)
    var [ key ] = keys
    return `+${key}`
  }
  
  if (next) {
    var [ key ] = keys
    assert.equal(key, value)
    return `Δ${value.toString()}`
  }

  if (complete) {
    assert.ok(!value)
    if (!keys)
      return `-`

    var [ key ] = keys
    return `-${key}`
  }

  assert.fail()
}

var actual = []
assert.shifted = function() {
  assert.deepEqual(actual, [...arguments])
  actual.length = 0
}

var R = Node({
  x: null,
  A: Node({
    z: null,
    B: Node({ 
      z: null
    })
  })
})

var subject = new Subject()
var names = o => Object.getOwnPropertyNames(o).sort()

subject[List]('R', {
  isLeaf: path => !eval(path),
  selectWatcher: path => eval(path),
  selectChildren: path => names(eval(path)).map(name => `${path}.${name}`),
})
[Regroup](o => o[DistinctUntilChanged]())
[Materialize]()
[Select](o => serialize(o))
[Subscribe](o => { console.log(o); actual.push(o) })

subject[Next]()
assert.shifted('+R.x', 'ΔR.x', '+R.A.z', 'ΔR.A.z', '+R.A.B.z', 'ΔR.A.B.z')

R.A.m = null
assert.shifted('+R.A.m', 'ΔR.A.m')

delete R.x
assert.shifted('-R.x')

delete R.A.B
assert.shifted('-R.A.B.z')

subject[Complete]()
assert.shifted('-R.A.z', '-R.A.m', '-')