# @[kingjs][@kingjs]/[implement-interface][ns0]
Extends `kingjs/reflect.define-property` to map names to symbols according to iface.
## Usage
```js
var assert = require('assert')
var defineInterface = require('@kingjs/define-interface');
var implementInterface = require('@kingjs/implement-interface');

var InterfaceId = Symbol.for('@kingjs/IInterface.id');

// Demonstrate interoperating with existing interfaces like this:
// `Symbol.iterator` can be thought of as an interface with a single 
// method whose symbolic id is the same as the symbolic id of the 
// interface itself.
var kingjs = { };
var { IIterable } = defineInterface(
  kingjs, 'IIterable', {
    id: Symbol.iterator,
    members: {
      getIterator: Symbol.iterator
    }
  }
);

assert(IIterable.getIterator == Symbol.iterator);
assert(IIterable.GetIterator == Symbol.iterator);
assert(IIterable[InterfaceId] == IIterable.getIterator);

// now, any instance that's Symbol.iterator now implements IIterable!
assert(new Array() instanceof IIterable);
assert(new Map() instanceof IIterable);
assert(new Set() instanceof IIterable);

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
var { IEnumerable } = defineInterface(
  kingjs, 'IEnumerable', {
    id: '@kingjs/interface.IEnumerable',
    members: {
      getEnumerator: null
    }
  }
);

assert(IEnumerable[InterfaceId] == Symbol.for('@kingjs/interface.IEnumerable'))
assert(IEnumerable.getEnumerator == Symbol.for('@kingjs/interface.IEnumerable.getEnumerator'))
assert(IEnumerable.GetEnumerator == Symbol.for('@kingjs/interface.IEnumerable.getEnumerator'))

var { IEnumerator } = defineInterface(
  kingjs, 'IEnumerator', {
    id: '@kingjs/interface.IEnumerator',
    members: {
      current: null,
      moveNext: null,
    }
  }
);

assert(IEnumerator[InterfaceId] == Symbol.for('@kingjs/interface.IEnumerator'))
assert(IEnumerator.current == Symbol.for('@kingjs/interface.IEnumerator.current'))
assert(IEnumerator.Current == Symbol.for('@kingjs/interface.IEnumerator.current'))
assert(IEnumerator.moveNext == Symbol.for('@kingjs/interface.IEnumerator.moveNext'))
assert(IEnumerator.MoveNext == Symbol.for('@kingjs/interface.IEnumerator.moveNext'))

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
var { IB } = defineInterface(kingjs, "IB", {
  id: '@kingjs/interface.IB',
  members: { foo: null }
});

var { IX } = defineInterface(kingjs, "IX", {
  id: '@kingjs/interface.IX',
  members: { foo: null },
  extends: [ IB ]
})

var { IY } = defineInterface(kingjs, "IY", {
  id: '@kingjs/interface.IY',
  members: { foo: null },
  extends: [ IB ]
})

var { IA } = defineInterface(kingjs, "IA", {
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

```

## API
```ts
implementInterface(target, iface, descriptors)
```

### Parameters
- `target`: The target on which the interface will be declared.
- `iface`: A map for names to symbols used to rename properties declared in the descriptor.
- `descriptors`: A descriptor of methods and accessors that implement the interface.
- `descriptors.accessors`: Descriptors that implement the interfaces' accessors.
- `descriptors.methods`: Descriptors that implement the interfaces' methods.
### Returns
Returns target.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/implement-interface
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/is`](https://www.npmjs.com/package/@kingjs/is)|`^1.0.9`|
|[`@kingjs/reflect.define-accessor`](https://www.npmjs.com/package/@kingjs/reflect.define-accessor)|`^1.0.1`|
|[`@kingjs/reflect.define-function`](https://www.npmjs.com/package/@kingjs/reflect.define-function)|`^1.0.1`|
## Source
https://repository.kingjs.net/implement-interface
## License
MIT

![Analytics](https://analytics.kingjs.net/implement-interface)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/implement-interface
