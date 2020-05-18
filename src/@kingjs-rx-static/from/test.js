var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': {
      '-sync': { SubscribeAndAssert }, 
      '-static': { from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from([0, 1, 2])
  [SubscribeAndAssert]([0, 1, 2])

try {
  from({ [Symbol.iterator]: () => { throw 'error' } })
    [Subscribe]()
} 
catch(e) {
  assert.equal(e, 'error')
}