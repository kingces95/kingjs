var {
  '@kingjs': {
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { generate }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

generate(function*() { yield 0; yield 1; yield 2 })
  [SubscribeAndAssert]([0, 1, 2])

// cancel before next
generate(function*() { yield 0; yield 1 })
  [SubscribeAndAssert]([0], { terminate: true })

// cancel before next
var cancel
generate(function*() { yield 0; cancel(); yield 1 })
  [SubscribeAndAssert]([0], { abandon: o => cancel = o })
  
// cancel before complete
generate(function*() { yield 0; yield 1; cancel() })
  [SubscribeAndAssert]([0, 1], { terminate: true })

// cancel before complete
var cancel
generate(function*() { yield 0; cancel() })
  [SubscribeAndAssert]([0], { abandon: o => cancel = o })

generate(function*() { throw 'error' })
  [SubscribeAndAssert](null, { error: 'error' })