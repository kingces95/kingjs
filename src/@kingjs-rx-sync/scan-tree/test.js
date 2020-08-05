var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete },
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-rx': {
      '-subject': { Subject },
      '-sync': { Select, WatchTree, Materialize },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

class Node extends String {
  constructor(value) {
    super(value)

    if (arguments.length > 1)
      this.children = [...arguments].slice(1)
  }
  [Equals](other) { return this == other }
  [GetHashcode]() { return 0 }
  [IsLessThan](other) { return this < other }
}

// this makes Node.version IComparable
Number.prototype[Equals] = function(o) { return o == this }
Number.prototype[GetHashcode] = () => 0

var x = new Node('x')
var y = new Node('y')
var z = new Node('z')
var tree = new Node('R', x)
var internal = new Node('I', y)

// R - x, z
// |
// I - y

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

var cancel = () => null
var subjects = {
  R: new Subject(cancel), // root
  I: new Subject(cancel), // internal
  M: new Subject(cancel), // manual
}

var actual = []
subjects.M[WatchTree](tree, {
  isLeaf: node => !node.children,
  selectWatcher: node => subjects[node],
  selectChildren: node => [...node.children],
})
[Materialize]()
[Select](o => serialize(o))
[Subscribe](o => { console.log(o); actual.push(o) })

assert.shifted = function() {
  assert.deepEqual(actual, [...arguments])
  actual.length = 0
}

// expect creation and `next` events for each leaf
subjects.R[Next]()
assert.shifted('+x', 'Δx')

// expect creation and `next` events for leafs on new internal node
tree.children.push(internal)
subjects.R[Next]()
assert.shifted('Δx', '+y', 'Δy')

// expect creation and `next` event for new leaf
tree.children.push(z)
subjects.R[Next]()
assert.shifted('Δx', '+z', 'Δz')

// scan leafs when their respective watchers trigger a scan
subjects.I[Next]()
assert.shifted('Δy')
subjects.R[Next]()
assert.shifted('Δx', 'Δz')

// expect complete event for leaf
tree.children.pop()
subjects.R[Next]()
assert.shifted('Δx', '-z')

// expect complete event for internal node
tree.children.pop()
subjects.R[Next]()
assert.shifted('Δx', '-y')

// expect complete events for all nodes
subjects.M[Complete]()
assert.shifted('-x', '-')