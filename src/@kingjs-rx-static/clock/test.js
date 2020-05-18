var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    '-rx': { SubscribeAndAssert, 
      '-static': { clock }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

clock(0, { count = 3 })
  [SubscribeAndAssert]([ 0, 1, 2 ])

process.nextTick(async function() {
  var count = 3
  var result = []

  var i = 0
  await new Promise(resolve => {
    var unsubscribe = clock()[Subscribe](() => {

      // prove values are returned in different clock ticks
      process.nextTick(() => result.push(null))

      result.push(i++)

      if (i == count) {
        resolve()
        unsubscribe()
      }
    }, resolve)
  })

  assert.deepEqual(result, [0, null, 1, null, 2])
}