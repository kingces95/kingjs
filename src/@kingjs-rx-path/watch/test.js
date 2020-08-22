var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-promise': { sleep },
    '-rx': {
      '-path': { Watch, ToString },
      '-subject': { Subject, SubjectProxy: Wrap },
      '-sync': { Where, Materialize },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var stream = process.stdout
function log() {
  var args = [...arguments]
  var last = args.pop()
  for (var o of args)
    stream.write(o)
  console.log(last)
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
  //   z: new Leaf(1, 0, 'R.A.z'),
  //   B: Wrap({ 
  //     z: new Leaf(2, 0, 'R.A.B.z')
  //   })
  // })
})

var subject = new Subject()
var names = o => Object.getOwnPropertyNames(o).sort()
var i = 100

process.nextTick(async () => {
  subject[Watch]('R', {
    isLeaf: path => eval(path) instanceof Leaf,
    selectWatcher: path => eval(path)[Where](o => !o.isRead),
    selectChildren: path => names(eval(path)).map(name => `${path}.${name}`),
    selectEntity: path => eval(path),
    selectIdentity: entity => entity.ino,
    selectVersion: entity => entity.version,
    timeout: 200,
  })
  [Materialize]()
  [Subscribe](o => { 
    log(`${i++}: `, o)
    actual.push(o) 
  })
  
  subject[Next]()
  // R.x = new Leaf(0, 0, 'R.x')
  // R.x = new Leaf(0, 1, 'R.x')
  // R.x = new Leaf(0, 1, 'R.x')
  // R.x = new Leaf(0, 2, 'R.x')
  delete R.x
  await sleep(50)
  R.new_x = new Leaf(0, 2, 'R.new_x')
  delete R.new_x
  //R.A.B.new_z = 2
  // delete R.A.B.z
  //subject[Next]()
  
  subject[Complete]()
})