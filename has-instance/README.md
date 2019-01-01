# @[kingjs](https://www.npmjs.com/package/kingjs)/has-instance
`Symbol.hasInstance` implementation that tests for a function's id in an instance's polymorphisms.
## Usage
Test that `FooBar` implements `IFoo` and `IBar` using `instanceof` operator like this:
```js
var polymorphismsId = require('@kingjs/polymorphisms');
var identityId = require('@kingjs/identity');
var hasInstance = require('@kingjs/has-instance');

function IFoo() { }
IFoo.prototype = null;
IFoo[identityId] = Symbol('IFoo')
IFoo.foo = Symbol('foo');
Object.defineProperty(IFoo, Symbol.hasInstance, { value: hasInstance });

function IBar() { }
IBar.prototype = null;
IBar[identityId] = Symbol('IBar')
IBar.bar = Symbol('bar');
Object.defineProperty(IBar, Symbol.hasInstance, { value: hasInstance });

function FooBar() { }
FooBar.prototype[IFoo.foo] = 'foo';
FooBar.prototype[IBar.bar] = 'bar';
FooBar[polymorphismsId] = {
  [IFoo[identityId]]: IFoo,
  [IBar[identityId]]: IBar,
}

var fooBar = new FooBar();
var isIFoo = fooBar instanceof IFoo; // true
var isIBar = fooBar instanceof IBar; // true
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
