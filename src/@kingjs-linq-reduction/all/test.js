var { assert,
  '@kingjs': {
    '-linq': {
      '-reduction': { All },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

assert(of(0, 1, 2)[All](function(o) { return o < 3 }))
assert(!of(0, 1, 2)[All](function(o) { return o < 2 }))