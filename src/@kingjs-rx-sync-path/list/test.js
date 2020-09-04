var {
  '@kingjs': {
    IObserver: { Next, Complete },
    '-rx': {
      '-subject': { Subject },
      '-sync': { SubscribeAndAssert, Materialize,
        '-path': { List }
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var subject = new Subject()

var watchers = {
  ['a']: new Subject(),
  ['ab']: new Subject(),
}

var children = {
  ['a']: [ 'a.x', 'ab' ],
  ['ab']: [ 'ab.y' ],
}

subject
  [List]('a', {
      isLeaf: path => !watchers[path],
      selectWatcher: path => watchers[path],
      selectChildren: path => [...children[path]],
    })
  [Materialize]()
  [SubscribeAndAssert]([
    () => subject[Next](),
    { grouping: true, keys: [ 'a.x' ] },
    { next: true, value: 'a.x', keys: [ 'a.x' ] },
    { grouping: true, keys: [ 'ab.y' ] },
    { next: true, value: 'ab.y', keys: [ 'ab.y' ] },

    () => subject[Next](),

    () => watchers['a'][Next](),
    { next: true, value: 'a.x', keys: [ 'a.x' ] },

    () => {
      children['ab'].push('ab.z')
      watchers['ab'][Next]()
    },
    { next: true, value: 'ab.y', keys: [ 'ab.y' ] },
    { grouping: true, keys: [ 'ab.z' ] },
    { next: true, value: 'ab.z', keys: [ 'ab.z' ] },

    () => {
      children['ab'].shift()
      watchers['ab'][Next]()
    },
    { complete: true, keys: [ 'ab.y' ] },
    { next: true, value: 'ab.z', keys: [ 'ab.z' ] },

    () => {
      children['a'].pop()
      watchers['a'][Next]()
    },
    { next: true, value: 'a.x', keys: [ 'a.x' ] },
    { complete: true, keys: [ 'ab.z' ] },

    () => subject[Complete](),
    { complete: true, keys: [ 'a.x' ] },
    { complete: true },
  ], { log: false })