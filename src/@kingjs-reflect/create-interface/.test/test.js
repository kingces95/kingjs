var assert = require('assert');
var createInterface = require('..');

var IsInterface = Symbol.for('@kingjs/isInterface');

// IA : Foo
// IB : Foo
// IC : Foo
// IC : Foo

var IA = createInterface('IA', { members: { foo: null } });
assertOwnOnlyFoo(IA);

var IB = createInterface('IB', { members: { foo: null }, extends: IA });
assertOwnOnlyFoo(IB);
var inherited = Object.getPrototypeOf(IB);
assert(inherited.foo == IA.foo)

var IC = createInterface('IC', { members: { foo: null }, extends: IB });
assertOwnOnlyFoo(IC);
var inherited = Object.getPrototypeOf(IC);
assert(IA.foo in inherited.foo)
assert(IB.foo in inherited.foo)

var ID = createInterface('ID', { members: { foo: null }, extends: IC });
assertOwnOnlyFoo(ID);
var inherited = Object.getPrototypeOf(ID);
assert(IA.foo in inherited.foo)
assert(IB.foo in inherited.foo)
assert(IC.foo in inherited.foo)

var IAll = createInterface('IAll', { members: { foo: null }, extends: [ IA, IB, IC, ID ] });
assertOwnOnlyFoo(IAll);
var inherited = Object.getPrototypeOf(IAll);
assert(IA.foo in inherited.foo)
assert(IB.foo in inherited.foo)
assert(IC.foo in inherited.foo)
assert(ID.foo in inherited.foo)

function assertOwnOnlyFoo(iface) {
  var own = Object.getOwnPropertyNames(iface);
  assert(own.length == 2);
  assert(own[0] == 'foo');
  assert(own[1] == 'Foo');
}