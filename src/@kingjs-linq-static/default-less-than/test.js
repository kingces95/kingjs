var { assert,
  '@kingjs': {
    '-linq-static': { defaultLessThan: lessThan }
  }
} = module[require('@kingjs-module/dependencies')]()

assert(lessThan(0, 0) == false)
assert(lessThan(0, 1) == true)