# @[kingjs](https://www.npmjs.com/package/kingjs)/polymorphisms
A symbol declared on functions which contains an object with symbols declared for each of the function's polymorphisms.
## Usage
Publish the fact that `FooBar` implements `IFoo` and `IBar` like this:
```js
var polymorphismsId = require('@kingjs/polymorphisms');
var identityId = require('@kingjs/identity');

function IFoo() { }
IFoo.prototype = null;
var IFooId = IFoo[identityId] = Symbol('IFoo')
IFoo.foo = Symbol('foo');

function IBar() { }
IBar.prototype = null;
var IBarId = IBar[identityId] = Symbol('IBar')
IBar.bar = Symbol('bar');

function FooBar() { }
FooBar.prototype[IFoo.foo] = 'foo';
FooBar.prototype[IBar.bar] = 'bar';
FooBar[polymorphismsId] = {
  [IFoo[identityId]]: IFoo,
  [IBar[identityId]]: IBar,
}

var isIFoo = IFooId in FooBar[polymorphismsId]; // true
var isIBar = IBarId in FooBar[polymorphismsId]; // true
```
## See Also
- `Identity`: see [@kingjs/identity][identity]
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/polymorphisms
```
## License
MIT

![Analytics](https://analytics.kingjs.net/polymorphisms)

[identity]: https://www.npmjs.com/package/@kingjs/identity