var {
  '@kingjs': {
    IObserver: { Next, Complete },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert,
      '-path': { Watch },
      '-subject': { Subject },
      '-sync': { Materialize },
    },
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
var Z0 = new Leaf('a.z', 'z', 0)

var watchers = {
  ['a']: new Subject(),
  ['ab']: new Subject(),
}

var children = {
  ['a']: [ x0, b ],
  ['ab']: [ y0 ],
}

process.nextTick(async () => {
  await subject
    [Watch](a, {
      isLeaf: o => o instanceof Leaf,
      selectWatcher: o => watchers[o.path],
      selectChildren: o => [...children[o.path]],
      selectPath: o => o.path,
      selectIdentity: o => o.id,
      selectVersion: o => o.v,
      debounce: 20,
    })
    [Materialize]()
    [SubscribeAndAssert]([
      () => subject[Next](),
      { grouping: true, keys: [ 'x' ] },
      { grouping: true, keys: [ 'x', 'a.x' ] },
      { next: true, value: x0, keys: [ 'x', 'a.x' ] },
      { grouping: true, keys: [ 'y' ] },
      { grouping: true, keys: [ 'y', 'ab.y' ] },
      { next: true, value: y0, keys: [ 'y', 'ab.y' ] },

      () => subject[Next](),

      () => watchers['a'][Next](),

      () => {
        children['a'][0] = x1, // x0 -> x1
        watchers['a'][Next]()
      },
      { next: true, value: x1, keys: [ 'x', 'a.x' ] },

      () => {
        // create z
        children['ab'].push(z0)
        watchers['ab'][Next]()
      },
      { grouping: true, keys: [ 'z' ] },
      { grouping: true, keys: [ 'z', 'ab.z' ] },
      { next: true, value: z0, keys: [ 'z', 'ab.z' ] },

      () => {
        // delete z
        children['ab'].pop()
        watchers['ab'][Next]()
      },
      () => sleep(100),
      { complete: true, keys: [ 'z', 'ab.z' ] },
      { complete: true, keys: [ 'z' ] },

      () => {
        // create z
        children['ab'].push(z0)
        watchers['ab'][Next]()
      },
      { grouping: true, keys: [ 'z' ] },
      { grouping: true, keys: [ 'z', 'ab.z' ] },
      { next: true, value: z0, keys: [ 'z', 'ab.z' ] },

      () => {
        // rename ab.z -> a.z
        children['ab'].pop()
        watchers['ab'][Next]()

        children['a'].push(Z0)
        watchers['a'][Next]()
      },
      { complete: true, keys: [ 'z', 'ab.z' ] },
      // { complete: true, keys: [ 'z' ] } // that this is missing => move
      { grouping: true, keys: [ 'z', 'a.z' ] },
      { next: true, value: Z0, keys: [ 'z', 'a.z' ] },

      () => {
        children['a'].pop()
        children['a'].pop()
        watchers['a'][Next]()
      },
      () => sleep(100),
      { complete: true, keys: [ 'y', 'ab.y' ] },
      { complete: true, keys: [ 'y' ] },
      { complete: true, keys: [ 'z', 'a.z' ] },
      { complete: true, keys: [ 'z' ] },

      () => subject[Complete](),
      { complete: true, keys: [ 'x', 'a.x' ] },
      { complete: true, keys: [ 'x' ] },
      { complete: true },
    ], { log: false })
})