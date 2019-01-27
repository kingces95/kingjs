var assert = require('assert')
var defineInterface = require('@kingjs/define-interface');
var implementInterface = require('..');

var kingjs = { };
var { IIterable } = defineInterface(
  kingjs, 'IIterable', {
    id: Symbol.iterator,
    members: {
      getIterator: Symbol.iterator
    }
  }
);

var instance = { foo: 0 };
implementInterface(instance, IIterable, {
  getIterator: {
    // TODO: wrap functions in value
    value: function* () {
      for (var name in this)
        yield { name, value: this[name] };
    }
  }
});

var { GetIterator } = IIterable;
var iterator = instance[GetIterator]();
var next = iterator.next();
assert(!next.done);
assert.deepEqual(next.value, { name: 'foo', value: 0 });
next = iterator.next();
assert(next.done);