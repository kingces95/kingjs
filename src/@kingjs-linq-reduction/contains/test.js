var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Contains },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert(of(1, 2, 3)[Contains](2))
assert(
  of(
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Chris' }
  )[Contains]({ name: 'Chris' }, 
    (l, r) => l.name == r.name
  )
)