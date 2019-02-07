var assert = require('assert')
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');
var IIterable = require('@kingjs/i-iterable');
var createInterface = require('@kingjs/reflect.create-interface');
var implementInterface = require('..');

var instance = { foo: 0 };
implementInterface(instance, IIterable, {
  methods: {
    getIterator: function* () {
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

// Demonstrate a multi property interfaces like this:
// `IEnumerable` has a single method `getEnumerator` that returns an
// `IEnumerable` that has a property `current` and a method `moveNext`
// which returns `true` if there are more elements or `false` if not.

var instance = [ 1 ];
implementInterface(instance, IEnumerable, {
  methods: {
    getEnumerator: function() {
      var target = this;
      var index = -1;

      return implementInterface({ }, IEnumerator, {
        methods: {
          moveNext: () => ++index < target.length
        },
        accessors: {
          current: () => target[index]
        }
      });
    }
  }
});

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

var instance = { };

// implement IB
implementInterface(instance, IB, {
  methods: { foo: () => null }
});

// implement IX
implementInterface(instance, IX, {
  methods: { foo: () => null }
});

// cannot implement IA without first implementing IY 
assert.throws(() => 
  implementInterface(instance, IA, {
    methods: { foo: () => null }
  })
)
implementInterface(instance, IY, {
  methods: { foo: () => null }
});

// cannot implement IA without also providing IA.foo
assert.throws(() => 
  implementInterface(instance, IA, { })
)

// implement IA
implementInterface(instance, IA, {
  methods: { foo: () => null }
});
