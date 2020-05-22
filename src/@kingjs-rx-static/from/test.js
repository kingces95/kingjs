var {
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': { SubscribeAndAssert, 
      '-static': { from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  await from([0, 1, 2])
    [SubscribeAndAssert]([0, 1, 2])

  try {
    var badObservable = from({ [Symbol.iterator]: () => { throw 'error' } })
    badObservable[Subscribe]()
  } 
  catch(e) {
    assert.equal(e, 'error')
  }
})
