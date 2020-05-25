var { assert,
  '@kingjs': {
    '-linq': { SelectMany, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(of(0, 1), of(2, 3))
  [SelectMany]()
  [EnumerateAndAssert]([0, 1, 2, 3])

of({ name: 'Alice', pets: of('Tiger', 'Butch') },
   { name: 'Bob', pets: of('Spike', 'Fluffy') })
  [SelectMany]((x, i) => { 
    assert(x.name != 'Alice' || i == 0)
    assert(x.name != 'Bob' || i == 1)
    return x.pets 
  }, (x, p) => x.name + ' owns ' + p)
  [EnumerateAndAssert]([
    'Alice owns Tiger', 
    'Alice owns Butch', 
    'Bob owns Spike', 
    'Bob owns Fluffy'
  ])