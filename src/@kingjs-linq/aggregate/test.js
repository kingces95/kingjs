//require('kingjs')
var { assert,
  '@kingjs': {
    '-linq': { Aggregate },
  }
} = module[require('@kingjs-module/dependencies')]()

var sequence = [2, 3, 4]

var result = sequence[Aggregate](1, function(x) {
  return this + x 
}, o => String(o))

assert(result === '10')