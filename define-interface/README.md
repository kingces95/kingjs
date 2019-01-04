# @[kingjs](https://www.npmjs.com/package/kingjs)/define-interface
Defines or aliases a group of global symbols.
## Usage
Define/alias global symbols on `Function`s representing an interface `IFoo` with member `foo` and `bar`, and an interface `IBar` which extends `IFoo` with member `bar` like this:
```js
var assert = require('assert');
var defineInterface = require('@kingjs/define-interface');

var target = { };

var IFoo = defineInterface(target, 'IFoo', {
  id: Symbol.for('@kingjs/IFoo'),
  members: { 
    foo: Symbol.for('IFoo (custom)'),
    baz: null
  }
});

var IBar = defineInterface(target, 'IBar', {
  members: { bar: null },
  extends: [ IFoo ]
});

assert(target.IFoo == IFoo);
assert(target.IBar == IBar);

assert.throws(IFoo);
assert.throws(IBar);

assert(IFoo.prototype === null);
assert(IBar.prototype === null);

assert(Symbol.keyFor(IFoo.baz) == '@kingjs/IFoo.baz');
assert(Symbol.keyFor(IFoo.foo) == 'IFoo (custom)');
assert(Symbol.keyFor(IBar.bar) == 'IBar.bar');

var Identity = Symbol.for('@kingjs/Identity');
assert(Symbol.keyFor(IFoo[Identity]) == '@kingjs/IFoo');
assert(Symbol.keyFor(IBar[Identity]) == 'IBar');

assert(IFoo.name == '@kingjs/IFoo');
assert(IBar.name == 'IBar');

var Polymorphism = Symbol.for('@kingjs/Polymorphisms');
assert(Object.getOwnPropertySymbols(IFoo[Polymorphism]).length == 1);
assert(IFoo[Identity] in IFoo[Polymorphism]);

assert(Object.getOwnPropertySymbols(IBar[Polymorphism]).length == 2);
assert(IFoo[Identity] in IBar[Polymorphism]);
assert(IBar[Identity] in IBar[Polymorphism]);

assert(IFoo[Symbol.hasInstance] == require('@kingjs/has-instance'));

function FooBar() { }
FooBar.prototype[IFoo.foo] = 'foo';
FooBar.prototype[IFoo.baz] = 'baz';
FooBar.prototype[IBar.bar] = 'bar';
FooBar[Polymorphism] = {
  [IFoo[Identity]]: IFoo,
  [IBar[Identity]]: IBar,
}

var fooBar = new FooBar();
assert(fooBar instanceof IFoo);
assert(fooBar instanceof IBar);
```
## API
```ts
declare function defineInterface(target, name, descriptor);
```
### Parameters
- `target`: The target to declare the interface on.
- `name`: The name of the property on target to assign the interface. If there is no `descriptor.id`, then `name` will be used as the symbol name.
- `descriptor`: The members, extensions, and symbol comprising the interface.
  - `id`: Optional symbol to identify the interface.
  - `members`: Optional key value pairs where value is `null` or `symbol`.
  - `extends`: Optional array of interfaces expressed as functions.
### Returns
A function representing the interface.
## Remarks
An interface is a `Function` that throws when invoked, has no prototype, whose `@kingjs/identity` and `@kingjs/polymorphisms` are configured, and which has a properties corresponding to `members` and whose values are symbols.

All symbols are globally registered. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/define-interface
```
## License
MIT

![Analytics](https://analytics.kingjs.net/define-interface)