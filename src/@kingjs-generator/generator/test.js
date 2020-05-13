var { assert,
  '@kingjs-generator': { Generator }
} = module[require('@kingjs-module/dependencies')]()

var generator = (function* protoGenerator() { })
assert.equals(Generator, generator.constructor)
assert.ok(generator instanceof Generator)