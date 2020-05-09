var { assert,
  '@kingjs-interface': { IInterface, IEnumerator }
} = module[require('@kingjs-module/dependencies')]()

var MoveNext = Symbol.for('@kingjs-interface/IEnumerator.moveNext')
var Current = Symbol.for('@kingjs-interface/IEnumerator.current')

assert.ok(IEnumerator instanceof Function)
assert.equal(IEnumerator.name, '@kingjs-interface/IEnumerator')

assert.equal(IEnumerator.MoveNext, MoveNext)
assert.equal(IEnumerator.Current, Current)
assert.ok(IEnumerator instanceof IInterface)