var { 
  '@kingjs': {
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

// cancel before complete
from([0, 1])
  [SubscribeAndAssert]([0, 1], { terminate: true })