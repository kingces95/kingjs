var assert = require('assert');
var lambda = require('..');

var target = { };

var foo = {
  value: '0'
}
foo = lambda.call(foo, 'Foo');
assert(foo.value.name = 'Foo');

var bar = {
  get: 'this.field', 
  set: 'this.field = value'
}
bar = lambda.call(bar, 'Bar');
assert(bar.get.name = 'Bar');
assert(bar.set.name = 'Bar');

Object.defineProperties(target, { foo, bar });
assert(target.foo() == 0);
target.bar = 1;
assert(target.field == 1);
assert(target.bar == 1);