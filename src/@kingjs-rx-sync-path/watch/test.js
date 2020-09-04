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

var watchers = {
  ['a']: new Subject(),
  ['ab']: new Subject(),
}

var children = {
  ['a']: [ 'a.x', 'ab' ],
  ['ab']: [ 'ab.y' ],
}

var entity = {
  ['a.x']: 'x0',
  ['ab.y']: 'y0',
  ['ab.z']: 'z0',
}

subject
  [Watch]('a', {
    isLeaf: path => !watchers[path],
    selectWatcher: path => watchers[path],
    selectChildren: path => [...children[path]],
    selectEntity: path => entity[path],
    selectIdentity: entity => entity[0],
    selectVersion: entity => entity[1],
  })
  [Materialize]()
  [SubscribeAndAssert]([
    () => subject[Next](),
    { grouping: true, keys: [ 'a.x' ] },
    { grouping: true, keys: [ 'a.x', 'x' ] },
    { next: true, value: 'x0', keys: [ 'a.x', 'x' ] },
    { grouping: true, keys: [ 'ab.y' ] },
    { grouping: true, keys: [ 'ab.y', 'y' ] },
    { next: true, value: 'y0', keys: [ 'ab.y', 'y' ] },

    () => subject[Next](),

    () => watchers['a'][Next](),

    () => {
      entity['a.x'] = 'x1',
      watchers['a'][Next]()
    },
    { next: true, value: 'x1', keys: [ 'a.x', 'x' ] },

    () => {
      children['ab'].push('ab.z')
      watchers['ab'][Next]()
    },
    { grouping: true, keys: [ 'ab.z' ] },
    { grouping: true, keys: [ 'ab.z', 'z' ] },
    { next: true, value: 'z0', keys: [ 'ab.z', 'z' ] },

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

  ], { log: false })