var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx-sync': { SubscribeAndAssert, 
      '-static': { from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from([0, 1, 2])
  [SubscribeAndAssert]([0, 1, 2])

// cancel before next
from([0, 1])
  [SubscribeAndAssert]([0], { terminate: true })

// cancel before next
var cancel
var iterator = function*() { yield 0; cancel(); yield 1 }
  from(iterator())
    [SubscribeAndAssert]([0], { abandon: o => cancel = o })
  
// cancel before complete
from([0, 1])
  [SubscribeAndAssert]([0, 1], { terminate: true })

// cancel before complete
var cancel
var iterator = function*() { yield 0; cancel() }
from(iterator())
  [SubscribeAndAssert]([0], { abandon: o => cancel = o })

var iterator = function*() { throw 'error' }
from(iterator())
  [SubscribeAndAssert](null, { error: 'error' })