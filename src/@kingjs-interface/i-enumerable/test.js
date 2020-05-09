var { assert,
  '@kingjs-interface': { IInterface, IEnumerable }
} = module[require('@kingjs-module/dependencies')]()

var id = Symbol.for('@kingjs-interface/IEnumerable.getEnumerator')

assert.ok(IEnumerable instanceof Function)
assert.equal(IEnumerable.name, '@kingjs-interface/IEnumerable')

assert.equal(IEnumerable.getEnumerator, id)
assert.equal(IEnumerable.GetEnumerator, id)
assert.ok(IEnumerable instanceof IInterface)