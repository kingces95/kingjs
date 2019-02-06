var assert = require('assert');
var createInterface = require('..');

var IEnumerableId = Symbol.for('@kingjs/IEnumerable');
var GetEnumeratorId = Symbol.for('@kingjs/IEnumerable.getEnumerator');

var IEnumerable = createInterface(
  IEnumerableId, {
    members: { 
      getEnumerator: GetEnumeratorId,
    }
  }
);

// each interface is really just a stripped down function...
assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');
assert(IEnumerable.prototype == null);
assert(IEnumerable.constructor == null);

// ...that maps strings to symbols where each symbol identifies a member
assert(IEnumerable.getEnumerator == GetEnumeratorId);

// each member has a capitalized alias
assert(IEnumerable.GetEnumerator == GetEnumeratorId);

// the interface's Id is stored in '@kingjs/IInterface.id'
var Id = Symbol.for('@kingjs/IInterface.id');
assert(IEnumerable[Id] == IEnumerableId);

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
assert(IEnumerator[Id] == Symbol.for('@kingjs/IEnumerator'));
assert(IEnumerator.current = Symbol.for('@kingjs/IEnumerator.current'));
assert(IEnumerator.moveNext = Symbol.for('@kingjs/IEnumerator.moveNext'));

// make all arrays IEnumerable
Array.prototype[IEnumerable[Id]] = null;
Array.prototype[IEnumerable.getEnumerator] = function() {
  var index = -1;
  var current;

  return Object.defineProperties({ }, {
    [IEnumerator[Id]]: { 
      value: null 
    },
    [IEnumerator.current]: { 
      get: () => current 
    },
    [IEnumerator.moveNext]: { 
      value: () => {
        if (++index >= this.length)
          return false;
        current = this[index];
        return true;
      }
    }
  })
}
assert([] instanceof IEnumerable);

// enumerate an array using IEnumerable
var array = [ 0 ];
var enumerator = array[IEnumerable.getEnumerator]();
assert(enumerator instanceof IEnumerator);
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 0);
assert(!enumerator[IEnumerator.moveNext]());