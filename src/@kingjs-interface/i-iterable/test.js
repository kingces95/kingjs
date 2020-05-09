var { assert,
  '@kingjs-interface': { IIterable }
} = module[require('@kingjs-module/dependencies')]()

var iterator = Symbol.iterator
var IInterfaceId = Symbol.for('@kingjs-interface/IInterface')

assert.equal(IIterable.name, '@kingjs-interface/IIterable')
assert.equal(IIterable.getIterator, iterator)
assert.ok([] instanceof IIterable)
assert.ok('' instanceof IIterable)
assert.ok(IInterfaceId in IIterable)