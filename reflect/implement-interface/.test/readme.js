var assert = require('assert')
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');
var IIterable = require('@kingjs/i-iterable');
var createInterface = require('@kingjs/reflect.create-interface');
var implementInterface = require('..');

var instance = implementInterface(
  { foo: 0 }, IIterable, {
    *getIterator() {
      for (var name in this)
        yield { name, value: this[name] };
    }
  }
);

var { GetIterator } = IIterable;
var iterator = instance[GetIterator]();
var next = iterator.next();
assert(!next.done);
assert.deepEqual(next.value, { name: 'foo', value: 0 });
next = iterator.next();
assert(next.done);

// Demonstrate a multi property interfaces like this:
// `IEnumerable` has a single method `getEnumerator` that returns an
// `IEnumerable` that has a property `current` and a method `moveNext`
// which returns `true` if there are more elements or `false` if not.
implementInterface(Array.prototype, IEnumerable, {
  getEnumerator() {
    var target = this;
    var index = -1;

    // return a quick and dirty implementation of `IEnumerator` like this:
    return {
      [IEnumerator.MoveNext]() { return ++index < target.length },
      get [IEnumerator.Current]() { return target[index] }
    }
  }
});

var instance = [ 1 ];
var enumerator = instance[IEnumerable.GetEnumerator]();
assert(enumerator[IEnumerator.MoveNext]());
assert(enumerator[IEnumerator.Current] == 1);
assert(!enumerator[IEnumerator.MoveNext]());

// demonstrate "The Diamond" where IB is indirectly inherited twice.
// IA : IX, IY
// IX : IB
// IY : IB
var IB = createInterface("IB", {
  id: '@kingjs/interface.IB',
  members: { foo: null }
});

var IX = createInterface("IX", {
  id: '@kingjs/interface.IX',
  members: { foo: null },
  extends: [ IB ]
})

var IY = createInterface("IY", {
  id: '@kingjs/interface.IY',
  members: { foo: null },
  extends: [ IB ]
})

var IA = createInterface("IA", {
  id: '@kingjs/interface.IA',
  members: { foo: null },
  extends: [ IX, IY ]
})

// cannot implement IA without first implementing IY 
assert.throws(() => 
  implementInterface({ }, IA, {
    [IX.foo]() { return null },
    [IB.foo]() { return null },
    [IA.foo]() { return null }
  })
)

// cannot implement IA without also providing IA.foo
assert.throws(() => 
  implementInterface({ }, IA, {
    [IX.foo]() { return null },
    [IY.foo]() { return null },
    [IB.foo]() { return null },
  })
)

var instance = { };
implementInterface(instance, IB, {
  foo() { return null; }
});
implementInterface(instance, IX, {
  foo() { return null; }
});
implementInterface(instance, IY, {
  foo() { return null }
});
implementInterface(instance, IA, {
  foo() { return null }
});

var IAll = createInterface("IAll", {
  id: '@kingjs/interface.IA',
  extends: [ IA ]
})

// implement IAll
var instance = { };
implementInterface(instance, IAll, {
  foo() { return 0; },
  [IA.foo]() { return 1; }
});
assert(Symbol.for('IAll') in instance);
assert(instance[IA.foo]() == 1);
assert(instance[IX.foo]() == 0);
assert(instance[IY.foo]() == 0);
assert(instance[IB.foo]() == 0);