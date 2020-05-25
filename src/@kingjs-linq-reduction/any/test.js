var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { Any },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert(of(0, 1, 2)[Any]())
assert(of(0, 1, 2)[Any](function(o) { return o == 1 }))
assert(!of(0, 1, 2)[Any](function(o) { return o == 3 }))