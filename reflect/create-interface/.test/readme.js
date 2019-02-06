var assert = require('assert');
var createInterface = require('..');

var IEnumerableId = Symbol.for('@kingjs/IEnumerable');
var GetEnumeratorId = Symbol.for('@kingjs/IEnumerable.getEnumerator');

var IEnumerable = createInterface(
  IEnumerableId, {
  members: { 
    getEnumerator: GetEnumeratorId,
  }
});

// each interface is really just a stripped down function...
assert(IEnumerable instanceof Function);
assert(IEnumerable.name == '@kingjs/IEnumerable');
assert(IEnumerable.prototype == null);
assert(IEnumerable.constructor == null);

// ...that maps string to symbols identifying each member
assert(IEnumerable.getEnumerator == GetEnumeratorId);

// each member has a capitalized alias
assert(IEnumerable.GetEnumerator == GetEnumeratorId);

// the symbolic id of an interface is stored in '@kingjs/IInterface.id'
var Id = Symbol.for('@kingjs/IInterface.id');
assert(IEnumerable[Id] == IEnumerableId);

// interfaces with one member share can their id with that single member
// even though in this case we decided to make them separate symbols
assert(IEnumerableId != GetEnumeratorId);