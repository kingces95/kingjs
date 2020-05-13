var { assert,
  '@kingjs-async-generator': { AsyncGenerator }
} = module[require('@kingjs-module/dependencies')]()

var asyncGenerator = async function* () { }
assert.equals(AsyncGenerator, asyncGenerator.constructor)
assert.ok(asyncGenerator instanceof AsyncGenerator)