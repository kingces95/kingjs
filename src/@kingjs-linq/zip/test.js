var {
  '@kingjs': {
    '-linq': { Zip, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(0, 1, 2)
  [Zip](of('a', 'b'), function(n, l) { 
    return { number: n, letter: l } 
  })
  [EnumerateAndAssert]([
    { number: 0, letter: 'a' },
    { number: 1, letter: 'b' },
  ])

of(0, 1)
  [Zip](of('a', 'b', 'c'), function(n, l) { 
    return { number: n, letter: l } 
  })
  [EnumerateAndAssert]([
    { number: 0, letter: 'a' },
    { number: 1, letter: 'b' },
  ])
