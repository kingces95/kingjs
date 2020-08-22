var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-rx': {
      '-subject': { Subject, SubjectProxy: Wrap },
      '-sync': { Materialize, Where,
        '-path': { Watch }
      },
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

class Leaf {
  constructor(ino, version, path) {
    this.ino = ino
    this.version = version
    this.path = path
  }
}

var actual = []
assert.shifted = function() {
  assert.deepEqual(actual, [...arguments])
  actual.length = 0
}

// This is a tree where nodes are objects and leafs are numbers. 
// `eval` coupled with property enumeration is used to read "paths" 
// to nodes like a file system API would list a directory at a path. 
// Each nodes implement IObservable and report create, read, update, 
// and delete (CRUD) events as a file system watcher API would report 
// directory events.

var R = Wrap({
  x: new Leaf(0, 0, 'R.x'),
  // A: Wrap({
  //   z: 1,
  //   B: Wrap({ 
  //     z: 2
  //   })
  // })
})

var subject = new Subject()
var names = o => Object.getOwnPropertyNames(o).sort()
var i = 100

subject[Watch]('R', {
  isLeaf: path => eval(path) instanceof Leaf,
  selectWatcher: path => eval(path)[Where](o => !o.isRead),
  selectChildren: path => names(eval(path)).map(name => `${path}.${name}`),
  selectEntity: path => eval(path),
  selectIdentity: entity => entity.ino,
  selectVersion: entity => entity.version
})
[Materialize]()
[Subscribe](o => { 
  process.stdout.write(`${i++}: `)
  console.log(o)
  actual.push(o) 
})

subject[Next]()
R.x = new Leaf(0, 0, 'R.x')
R.x = new Leaf(0, 1, 'R.x')
delete R.x
R.new_x = new Leaf(0, 0, 'R.new_x')
// R.A.B.new_z = 2
// delete R.A.B.z
//subject[Next]()

subject[Complete]()
return

assert.shifted('+R.x', 'ΔR.x', '+R.A.z', 'ΔR.A.z', '+R.A.B.z', 'ΔR.A.B.z')

R.A.m = null
assert.shifted('+R.A.m', 'ΔR.A.m')

delete R.x
assert.shifted('-R.x')

delete R.A.B
assert.shifted('-R.A.B.z')

subject[Complete]()
assert.shifted('-R.A.z', '-R.A.m', '-')