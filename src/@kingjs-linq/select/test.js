var {
  '@kingjs': {
    '-linq': { Select, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of('A', 'B', 'C')
  [Select](o => String.prototype.toLowerCase.call(o))
  [EnumerateAndAssert](['a', 'b', 'c'])

of('A', 'B', 'C')
  [Select]((x, i) => x + i)
  [EnumerateAndAssert](['A0', 'B1', 'C2'])