var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { fromIterable: from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from()
  [EnumerateAndAssert]()

from((function*() { })())
  [EnumerateAndAssert]()

from((function*() { yield 0 })())
  [EnumerateAndAssert]([0])

from((function*() { yield 0; yield 1 })())
  [EnumerateAndAssert]([0, 1])