var { assert,
  '@kingjs': {
    '-interface': { IInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

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