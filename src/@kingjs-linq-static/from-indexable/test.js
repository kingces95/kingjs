var {
  '@kingjs': {
    '-linq': { EnumerateAndAssert,
      '-static': { fromIndexable: from }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

from()
  [EnumerateAndAssert]()

from([])
  [EnumerateAndAssert]()

from([0])
  [EnumerateAndAssert]([0])

from([0, 1])
  [EnumerateAndAssert]([0, 1])

from('')
  [EnumerateAndAssert]()

from('a')
  [EnumerateAndAssert](['a'])

from('ab')
  [EnumerateAndAssert](['a', 'b'])