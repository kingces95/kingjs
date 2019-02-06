var assert = require('assert');
var createInterface = require('..');

var Id = Symbol.for('@kingjs/IInterface.id');

// single member interfaces use the single member's id for the interface id
// when the interface id is a string and a symbol is provided for the member
var IIterable = createInterface(
  '@kingjs/IIterable', {
    members: { 
      getIterator: Symbol.iterator 
    }
  }
)
assert(IIterable.name == '@kingjs/IIterable');
assert(IIterable[Id] == Symbol.iterator);
assert(IIterable.getIterator = Symbol.iterator);

// we can now check if an instance supports Symbol.iterator using
// our IIterable interface using the instanceof operator. Cool!
assert([] instanceof IIterable);
assert('' instanceof IIterable);