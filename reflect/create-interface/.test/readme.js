var assert = require('assert');
var createInterface = require('..');

var IInterfaceTag = Symbol.for('@kingjs/IInterface');

var IEnumerable = createInterface(
  '@kingjs/IEnumerable', {
    members: { 
      getEnumerator: null,
    }
  }
);
assert(IInterfaceTag in IEnumerable);

// each interface is really just a stripped down function...
assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');
assert(IEnumerable.prototype == null);
assert(IEnumerable.constructor == null);

// ...that maps strings to symbols where each symbol identifies a member
assert(IEnumerable.getEnumerator == Symbol.for('@kingjs/IEnumerable.getEnumerator'));

// each member has a capitalized alias
assert(IEnumerable.GetEnumerator == IEnumerable.getEnumerator);

// create an interface without explicitly providing any symbols
var IEnumerator = createInterface(
  '@kingjs/IEnumerator', {
    members: {
      current: null,
      moveNext: null
    }
  }
)
assert(IEnumerator.name == '@kingjs/IEnumerator');
assert(IEnumerator.current = Symbol.for('@kingjs/IEnumerator.current'));
assert(IEnumerator.moveNext = Symbol.for('@kingjs/IEnumerator.moveNext'));

// make all arrays IEnumerable
Array.prototype[IEnumerable.getEnumerator] = function() {
  var index = -1;
  var current;

  var enumerator = Object.create({
    get [IEnumerator.current]() { 
      return current; 
    },
    [IEnumerator.moveNext]: () => { 
        if (++index >= this.length)
          return false;
        current = this[index];
        return true;
    }
  });

  return enumerator;
}
assert([] instanceof IEnumerable);

// enumerate an array using IEnumerable
var array = [ 0 ];
var enumerator = array[IEnumerable.getEnumerator]();
assert(enumerator instanceof IEnumerator);
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 0);
assert(!enumerator[IEnumerator.moveNext]());

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
assert(IIterable.getIterator = Symbol.iterator);

// we can now check if an instance supports Symbol.iterator using
// our IIterable interface using the instanceof operator. Cool!
assert([] instanceof IIterable);
assert('' instanceof IIterable);

// the symbol @kingjs/IInterface.id can also be similarly turned 
// into an interface like this:
var IInterface = createInterface(
  '@kingjs/IInterface'
)
assert(IInterface.name == '@kingjs/IInterface');
assert(IInterface[''] = Symbol.for('@kingjs/IInterface'));

// *head explodes*
assert(IInterface instanceof IInterface);