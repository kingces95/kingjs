var { assert,
  '@kingjs': { IIterable }
} = module[require('@kingjs-module/dependencies')]()

var iterator = Symbol.iterator

assert.equal(IIterable.name, 'IIterable')
assert.equal(IIterable.GetIterator, iterator)
assert.ok([] instanceof IIterable)
assert.ok('' instanceof IIterable)