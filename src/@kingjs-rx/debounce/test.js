var {
  '@kingjs': {
    '-rx': { Debounce, SubscribeAndAssert,
      '-static': { clock },
      '-async': { Take, Timeout }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var ms = 20
var count = 5

process.nextTick(async () => {

  await clock(ms)
    [Take](count)
    [Debounce](ms * 2)
    [SubscribeAndAssert]([count - 1])

  await clock(ms)
    [Take](count)
    [Debounce](ms / 2)
    [SubscribeAndAssert]([0, 1, 2, 3, 4])

  await clock(ms)
    [Timeout](ms * 3, 'error')
    [Debounce](ms * 2)
    [SubscribeAndAssert](null, { error: 'error' })

  var cancel = await clock(ms)
    [Debounce](ms * 2)
    [SubscribeAndAssert](null, { terminate: true })
  cancel()
})