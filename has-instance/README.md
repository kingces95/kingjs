# @[kingjs](https://www.npmjs.com/package/kingjs)/has-instance
`Symbol.hasInstance` implementation that tests for a function's id in an instance's polymorphisms.
## Usage
Test that `FooBar` implements `IFoo` and `IBar` using `instanceof` operator like this:
```js
var hasInstance = require('@kingjs/has-instance');
var assert = require('assert')

var Identity = Symbol.for('@kingjs/Identity');
var Polymorphisms = Symbol.for('@kingjs/Polymorphisms');

function IFoo() { }
IFoo.prototype = null;
IFoo[Identity] = Symbol('IFoo')
IFoo.foo = Symbol('foo');
Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

function IBar() { }
IBar.prototype = null;
IBar[Identity] = Symbol('IBar')
IBar.bar = Symbol('bar');
Object.defineProperty(IBar, Symbol.hasInstance, { value: hasInstance });

function FooBar() { }
FooBar.prototype[IFoo.foo] = 'foo';
FooBar.prototype[IBar.bar] = 'bar';
FooBar[Polymorphisms] = {
  [IFoo[Identity]]: IFoo,
  [IBar[Identity]]: IBar,
}

var fooBar = new FooBar();
var isIFoo = fooBar instanceof IFoo;
var isIBar = fooBar instanceof IBar;

assert(isIFoo);
assert(isIBar);
```
## See Also
- `Identity`: see [@kingjs/identity][identity]
- `Polymorphisms`: see [@kingjs/polymorphisms][polymorphisms]
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/has-instance
```
## License
MIT

![Analytics](https://analytics.kingjs.net/has-instance)

[identity]: https://www.npmjs.com/package/@kingjs/identity
[polymorphisms]: https://www.npmjs.com/package/@kingjs/polymorphisms
