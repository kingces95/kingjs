var { assert,
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

  return
  // try {
  //   await from({ [Symbol.iterator]: () => { throw 'error' } })
  //     [Subscribe]()
  // } 
  // catch(e) {
  //   assert.equal(e, 'error')
  // }
})
