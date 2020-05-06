var { assert,
  '@kingjs': {
    '-interface': { IOrderedEnumerable, IEnumerable, IInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

var id = Symbol.for('@kingjs/IOrderedEnumerable.createOrderedEnumerable');

assert(IOrderedEnumerable instanceof Function);
assert(IOrderedEnumerable.name == '@kingjs/IOrderedEnumerable');

assert(IOrderedEnumerable.getEnumerator == IEnumerable.getEnumerator);
assert(IOrderedEnumerable.GetEnumerator == IEnumerable.getEnumerator);
assert(IOrderedEnumerable.createOrderedEnumerable == id);
assert(IOrderedEnumerable instanceof IInterface);