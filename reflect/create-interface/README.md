# @[kingjs][@kingjs]/[reflect][ns0].[create-interface][ns1]
Returns a function whose properties map strings to symbols which when defined together act as an interface.
## Usage
```js
var assert = require('assert');
var defineInterface = require('@kingjs/reflect.create-interface');

var {
  IInterface,
  IInterface: { Id }
} = defineInterface;

function readMe() {
  var target = { };

  var IFoo = createInterface('@kingjs/IFoo', {
    members: { 
      Foo: Symbol.for('IFoo (custom)'),
      Baz: null,
      iterator: Symbol.iterator
    }
  });

  var IBar = defineInterface(Symbol.for('IBar'), {
    members: { Bar: null },
    extends: [ IFoo ]
  });

  var { IBaz } = defineInterface(target, 'IBaz', {
    id: Symbol.for('IBaz')
  });

  assert(IFoo[Id] in IBar);

  assert(target.IFoo == IFoo);
  assert(target.IBar == IBar);
  
  assert.throws(IFoo);
  assert.throws(IBar);

  assert(IFoo.prototype === null);
  assert(IBar.prototype === null);

  assert(Symbol.keyFor(IFoo.Baz) == '@kingjs/IFoo.Baz');
  assert(Symbol.keyFor(IFoo.Foo) == 'IFoo (custom)');
  assert(Symbol.keyFor(IBar.Bar) == 'IBar.Bar');

  assert(Symbol.keyFor(IFoo[Id]) == '@kingjs/IFoo');
  assert(Symbol.keyFor(IBar[Id]) == 'IBar');

  assert(IFoo.name == '@kingjs/IFoo');
  assert(IBar.name == 'IBar');

  assert(IInterface[Id] in IFoo);
  assert(IInterface[Id] in IBar);

  function FooBar() { }

  FooBar.prototype[IFoo[Id]] = IFoo;
  FooBar.prototype[IFoo.Foo] = 'Foo';
  FooBar.prototype[IFoo.Baz] = 'Baz';

  FooBar.prototype[IBar[Id]] = IBar;
  FooBar.prototype[IBar.Bar] = 'Bar';

  var fooBar = new FooBar();
  assert(IFoo[Id] in fooBar);
  assert(fooBar instanceof IFoo);
  assert(IBar[Id] in fooBar);
  assert(fooBar instanceof IBar);
  assert(fooBar instanceof IBaz == false);
}
readMe();
```

## API
```ts
createInterface(id, descriptor)
```

### Parameters
- `id`: The symbol identifying the interface. The symbol must be registered or be built-in (lives on Symbol). If a string is passed then `Symbol.keyFor` is used to fetch/generate the symbol.
- `descriptor`: The description of the interfaces this interface extends, and the members that comprise interface this interface.
- `descriptor.extends`: An optional array of interfaces whose members this interfaces inherits.
- `descriptor.members`: An optional object that that provides string aliases for each member's symbol. If the symbol is `null`, then one is fetched/created via `Symbol.keyFor` by joining the interface name and the member name with period. In that case, the  interface `id` must a registered symbol.
### Returns
Returns a function whose properties are string alias to symbols associated with  interface members.
### Remarks
The returned interface function has the following properties:
- throws if activated.
- has a `null` prototype.
- implements `Symbol.hasInstance` so an instance can be determined to  implement an interface via `myInstance instanceof IMyInterface`. This is why a function was chosen to represent an interface.
- is, itself, an instance that implements `IInterface` so
  - `IMyInterface instanceof IInterface` is `true`
  - defines `IInterface.id` with value `id`
---
An instance implements an interface if:
- it implements all its extensions
- defines a property for each member using the symbol identifying the member.
- marks itself as implementing the interface by defining a property  using the the interface id as a name (with any value).
  - An interface with a single member can use the same symbol for its own id and that of its single member. This is the case for `IEnumerable`. So that the property `IEnumerable.getEnumerator` provides the implementation of the interface and  also serves as the tag indicating all members of the interface are implemented.
---
Each interface member has a capitalized alias.
- This way an interface can be deconstructed into capitalized versions of its members which are less likely to conflict with local variable names.
- For example, `IEnumerable.GetEnumerator` is an alias of  `IEnumerable.getEnumerator`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.create-interface
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.built-in-symbols`](https://www.npmjs.com/package/@kingjs/reflect.built-in-symbols)|`^1.0.0`|
## Source
https://repository.kingjs.net/reflect/create-interface
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/create-interface)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.create-interface
