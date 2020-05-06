var { assert,
  '@kingjs-interface': { IInterface, IEnumerable }
} = module[require('@kingjs-module/dependencies')]()

var id = Symbol.for('@kingjs/IEnumerable.getEnumerator')

assert(IEnumerable instanceof Function)
assert(IEnumerable.name == '@kingjs/IEnumerable')

assert(IEnumerable.getEnumerator == id)
assert(IEnumerable.GetEnumerator == id)
assert(IEnumerable instanceof IInterface)