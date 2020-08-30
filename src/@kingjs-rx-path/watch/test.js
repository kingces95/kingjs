var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    '-promise': { sleep },
    '-rx': {
      '-path': { Watch, Materialize },
      '-subject': { Subject, SubjectProxy: Wrap },
      '-sync': { Where, Select, SubscribeAndLog },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

// This is a tree where nodes are objects and leafs are numbers. 
// `eval` coupled with property enumeration is used to read "paths" 
// to nodes like a file system API would list a directory at a path. 
// Each nodes implement IObservable and report create, read, update, 
// and delete (CRUD) events as a file system watcher API would report 
// directory events.

class Leaf {
  constructor(id, path, version) {
    this.id = id
    this.path = path
    this.version = version
  }
}

Array.prototype.popAndAssert = function() {
  var args = [...arguments]
  if (!args.length) {
    assert.ok(this.length == 0)
    return
  }

  assert.deepEqual(this, args)
  this.length = 0
}
Array.prototype.popAndAssertComplete = function() {
  this.popAndAssert({ complete: true })
}
Array.prototype.popAndAssertValue = function(type, id, path, version, options = EmptyObject) {
  if (type != 'lost')
    options = { ...options, value: new Leaf(id, path, version) }
  this.popAndAssert({ [type]: true, id, path, ...options })
}
Array.prototype.popAndAssertFound = function(id, path, version) {
  this.popAndAssertValue('found', id, path, version)
}
Array.prototype.popAndAssertChange = function(id, path, version) {
  this.popAndAssertValue('change', id, path, version)
}
Array.prototype.popAndAssertLost = function(id, path, version) {
  this.popAndAssertValue('lost', id, path, version)
}
Array.prototype.popAndAssertMove = function(id, previousPath, path, version) {
  this.popAndAssertValue('move', id, path, version, { previousPath })
}

// var R = Wrap({
//   x: new Leaf(1, 0, 'R.x'),
//   // A: Wrap({
//   //   z: new Leaf(2, 0, 'R.A.z'),
//   //   B: Wrap({ 
//   //     z: new Leaf(3, 0, 'R.A.B.z')
//   //   })
//   // })
// })

var names = o => Object.getOwnPropertyNames(o).sort()
var selectVersion = entity => entity.version

function options(root) {
  var R = root
  return {
    isLeaf: path => eval(path) instanceof Leaf,
    selectWatcher: path => eval(path)[Where](o => !o.isRead),
    selectChildren: path => names(eval(path)).map(name => `${path}.${name}`),
    selectEntity: path => eval(path),
    selectIdentity: entity => entity.id,
    selectVersion,
    debounce: 200,
  }
}

process.nextTick(async () => {
  var id = 1
  var path = 'R.x'
  var previousPath = null
  var version = 0

  var R = Wrap({ x: new Leaf(id, path, version) })

  var actual = []
  var subject = new Subject()
  subject[Watch]('R', options(R))
    [Materialize]()
    [Subscribe](o => actual.push(o))
  
  // test found
  subject[Next]()
  actual.popAndAssertFound(id, path, version)

  // test change
  R.x = new Leaf(id, path, ++version)
  actual.popAndAssertChange(id, path, version)

  // suppress matching version
  R.x = new Leaf(id, path, version)
  actual.popAndAssert()

  // test move
  delete R.x
  actual.popAndAssert()
  previousPath = path
  R.new_x = new Leaf(id, path = 'R.new_x', version)
  actual.popAndAssertMove(id, previousPath, path, version)

  // test debounced delete
  delete R.new_x
  actual.popAndAssert()

  // test lost
  await sleep(500)
  actual.popAndAssertLost(id, path, version)
  
  // test complete
  subject[Complete]()
  actual.popAndAssertComplete()

  console.log(actual)
})