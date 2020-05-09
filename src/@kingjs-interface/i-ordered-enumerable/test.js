var { assert,
  '@kingjs-interface': { 
    IOrderedEnumerable, 
    IEnumerable, 
    IInterface 
  }
} = module[require('@kingjs-module/dependencies')]()

var id = Symbol.for('@kingjs-interface/IOrderedEnumerable.createOrderedEnumerable')

assert.ok(IOrderedEnumerable instanceof Function)
assert.equal(IOrderedEnumerable.name, '@kingjs-interface/IOrderedEnumerable')

assert.ok(IOrderedEnumerable instanceof IInterface)

assert.equal(IOrderedEnumerable.getEnumerator, IEnumerable.getEnumerator)
assert.equal(IOrderedEnumerable.GetEnumerator, IEnumerable.getEnumerator)
assert.equal(IOrderedEnumerable.createOrderedEnumerable, id)
assert.equal(IOrderedEnumerable.CreateOrderedEnumerable, id)