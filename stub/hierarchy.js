'use strict';

var assert = require('@kingjs/assert');

var fail = message => () => { throw message; };

function hierarchy(target, getPrototypeOf) {
  return new Proxy(target, {
    getPrototypeOf: getPrototypeOf,
    preventExtensions: true,
    set: fail('Writing prohibited.'),
    deleteProperty: fail('Deleting prohibited.'),
  });
}

var owner = Symbol('owner');
var a = { x: 0 };
var b = { y: 1 };
var A = { 
  children: a 
};
var B = {
  children: b,
  base: A
}
a[owner] = A;
b[owner] = B;

var members = hierarchy(b, x => {
  var base = x[owner].base;
  return base ? base.children : null;
});
for (var name in members)
  console.log(name + ' = ' + members[name]);

assert(members.x == 0);
assert(members.y == 1);

// members.x = null;
//delete members.x;

Object.defineProperties(module, {
  exports: { value: hierarchy }
});