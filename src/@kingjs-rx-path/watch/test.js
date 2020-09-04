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
  ['a.z']: 'z0',
}

subject
  [Watch]('a', {
    isLeaf: path => !watchers[path],
    selectWatcher: path => watchers[path],
    selectChildren: path => [...children[path]],
    selectEntity: path => entity[path],
    selectIdentity: entity => entity[0],
    selectVersion: entity => entity[1],
    debounce: 20,
  })
  [Materialize]()
  [SubscribeAndAssert]([
    () => subject[Next](),
    { grouping: true, keys: [ 'x' ] },
    { grouping: true, keys: [ 'x', 'a.x' ] },
    { next: true, value: 'x0', keys: [ 'x', 'a.x' ] },
    { grouping: true, keys: [ 'y' ] },
    { grouping: true, keys: [ 'y', 'ab.y' ] },
    { next: true, value: 'y0', keys: [ 'y', 'ab.y' ] },

    () => subject[Next](),

    () => watchers['a'][Next](),

    () => {
      entity['a.x'] = 'x1',
      watchers['a'][Next]()
    },
    { next: true, value: 'x1', keys: [ 'x', 'a.x' ] },

    () => {
      // create z
      children['ab'].push('ab.z')
      watchers['ab'][Next]()
    },
    { grouping: true, keys: [ 'z' ] },
    { grouping: true, keys: [ 'z', 'ab.z' ] },
    { next: true, value: 'z0', keys: [ 'z', 'ab.z' ] },

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
      children['ab'].push('ab.z')
      watchers['ab'][Next]()
    },
    { grouping: true, keys: [ 'z' ] },
    { grouping: true, keys: [ 'z', 'ab.z' ] },
    { next: true, value: 'z0', keys: [ 'z', 'ab.z' ] },

    () => {
      // rename ab.z -> a.z
      children['ab'].pop()
      watchers['ab'][Next]()

      children['a'].push('a.z')
      watchers['a'][Next]()
    },
    { complete: true, keys: [ 'z', 'ab.z' ] },
    // { complete: true, keys: [ 'z' ] } // that this is missing => move
    { grouping: true, keys: [ 'z', 'a.z' ] },
    { next: true, value: 'z0', keys: [ 'z', 'a.z' ] },

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
  ], { 
    log: false
  })