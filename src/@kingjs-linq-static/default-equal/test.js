var { assert,
  '@kingjs': {
    '-linq-static': { defaultEqual: equal }
  }
} = module[require('@kingjs-module/dependencies')]()

assert(equal(0, 0) == true)
assert(equal(0, 1) == false)