# @[kingjs][@kingjs]/[i-interface][ns0]
IInterface has no members. It tags  functions representing interfaces.
## Usage
```js
var assert = require('assert');
var IInterface = require('@kingjs/i-interface');

// an interface, in the abstract, is just 
// a symbolic name representing a collection 
// of of symbols (just one in this case).
var IInterfaceTag = Symbol.for('@kingjs/IInterface');
assert(IInterface[''] == IInterfaceTag);

// the name and symbol collection are 
// gathered onto an abstract function
assert(IInterface instanceof Function);
assert(IInterface.prototype == null);
assert(IInterface.constructor == null);
assert.throws(() => new IInterface);

// the reason a function is used as the 
// underlying object representing interfaces
// is so that instances can be tested to
// see if they implement an interface
assert(Symbol.hasInstance in IInterface);

// It's mind bending, but the function 
// itself is an instance implementing IInterface
assert(IInterface instanceof IInterface);
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/i-interface
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-interface`](https://www.npmjs.com/package/@kingjs/reflect.create-interface)|`latest`|
## Source
https://repository.kingjs.net/i-interface
## License
MIT

![Analytics](https://analytics.kingjs.net/i-interface)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/i-interface
