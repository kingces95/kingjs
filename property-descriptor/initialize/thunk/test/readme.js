var assert = require('assert');
var thunk = require('..');

var target = { 
  Foo: () => 0,
  Bar: 1,
};

var foo = {
  value: null
}
foo = thunk.call(foo, 'Foo');
assert(foo.value.name = 'Foo (thunk)');

var bar = {
  get: null, 
  set: null
}
bar = thunk.call(bar, 'Bar');
assert(bar.get.name = 'Bar (thunk)');
assert(bar.set.name = 'Bar (thunk)');

Object.defineProperties(target, { foo, bar });
assert(target.foo() == 0);
assert(target.bar == 1);
target.bar = 2;
assert(target.Bar == 2);