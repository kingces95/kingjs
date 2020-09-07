var {
  '@kingjs': {
    IObserver: { Next, Complete },
    '-rx': {
      '-subject': { Subject },
      '-sync': { Materialize, SubscribeAndAssert,
        '-path': { Watch }
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var subject = new Subject()

class Node {
  constructor(path) { this.path = path }
}
class Leaf extends Node {
  constructor(path, id, v) {
    super(path)
    this.id = id
    this.v = v
  }
}

var a = new Node('a')
var b = new Node('ab')
var x0 = new Leaf('a.x', 'x', 0)
var x1 = new Leaf('a.x', 'x', 1)
var y0 = new Leaf('ab.y', 'y', 0)
var z0 = new Leaf('ab.z', 'z', 0)

var watchers = {
  ['a']: new Subject(),
  ['ab']: new Subject(),
}

var children = {
  ['a']: [ x0, b ],
  ['ab']: [ y0 ],
}

subject
  [Watch](a, {
    isLeaf: o => o instanceof Leaf,
    selectWatcher: o => watchers[o.path],
    selectChildren: o => [...children[o.path]],
    selectPath: o => o.path,
    selectIdentity: o => o.id,
    selectVersion: o => o.v,
  })
  [Materialize]()
  [SubscribeAndAssert]([
    () => subject[Next](),
    { grouping: true, keys: [ 'a.x' ] },
    { grouping: true, keys: [ 'a.x', 'x' ] },
    { next: true, value: x0, keys: [ 'a.x', 'x' ] },
    { grouping: true, keys: [ 'ab.y' ] },
    { grouping: true, keys: [ 'ab.y', 'y' ] },
    { next: true, value: y0, keys: [ 'ab.y', 'y' ] },

    () => subject[Next](),

    () => watchers['a'][Next](),

    () => {
      children['a'][0] = x1, // x0 -> x1
      watchers['a'][Next]()
    },
    { next: true, value: x1, keys: [ 'a.x', 'x' ] },

    () => {
      children['ab'].push(z0)
      watchers['ab'][Next]()
    },
    { grouping: true, keys: [ 'ab.z' ] },
    { grouping: true, keys: [ 'ab.z', 'z' ] },
    { next: true, value: z0, keys: [ 'ab.z', 'z' ] },

    () => {
      children['ab'].shift()
      watchers['ab'][Next]()
    },
    { complete: true, keys: [ 'ab.y', 'y' ] },
    { complete: true, keys: [ 'ab.y' ] },

    () => {
      children['a'].pop()
      watchers['a'][Next]()
    },
    { complete: true, keys: [ 'ab.z', 'z' ] },
    { complete: true, keys: [ 'ab.z' ] },

    () => subject[Complete](),
    { complete: true, keys: [ 'a.x', 'x' ] },
    { complete: true, keys: [ 'a.x' ] },
    { complete: true }

  ], { log: true })