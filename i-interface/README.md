# @[kingjs][@kingjs]/[i-interface][ns0]
IInterface is implemented by functions that are interfaces and has a single member `Id` which returns a symbol identifying the interface.
## Usage
```js
var assert = require('assert');

// an interface, in the abstract, is just a symbolic name@kingjs/i-interface.
var IInterfaceId = Symbol.for('@kingjs/IInterface');

// ...representing a collection of of symbols (just one in this case).
var Id = Symbol.for('@kingjs/IInterface.id');

// the name and symbol collection are gathered onto an abstract function
var IInterface = require('..');
assert(IInterface instanceof Function);
assert(IInterface.prototype == null);
assert.throws(() => new IInterface);

// the identifying symbol is stored in Id on the function
assert(IInterface[Id] == IInterfaceId);

// the reason a function is used as the underlying object representing interfaces
// is so that instances can be tested to see if they implement an interface
assert(Symbol.hasInstance in IInterface);

// It's mind bending, but the function itself is an instance implementing IInterface
var instance = IInterface;
assert(instance.constructor == IInterface);
assert(instance[IInterfaceId] == IInterface);
assert(instance instanceof IInterface);
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/i-interface
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.define-interface`](https://www.npmjs.com/package/@kingjs/reflect.define-interface)|`^1.0.1`|
## Source
https://repository.kingjs.net/i-interface
## License
MIT

![Analytics](https://analytics.kingjs.net/i-interface)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/i-interface
