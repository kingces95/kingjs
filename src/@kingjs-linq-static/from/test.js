var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from()
  [EnumerateAndAssert]()

from([])
  [EnumerateAndAssert]()

from([0])
  [EnumerateAndAssert](0)

from([0, 1])
  [EnumerateAndAssert](0, 1)