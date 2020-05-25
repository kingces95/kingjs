var {
  '@kingjs': {
    '-linq': { Prepend, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of()[Prepend]()
  [EnumerateAndAssert]([undefined])

of(0)[Prepend](1)
  [EnumerateAndAssert]([1, 0])