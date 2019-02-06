var assert = require('assert');

// an interface, in the abstract, is just a symbolic name...
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