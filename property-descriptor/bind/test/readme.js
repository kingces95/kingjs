var assert = require('assert');
var bind = require('..');

var target = { id: 'target' };

var foo = {
  value: function() { return this; }
}
foo = bind.call(foo, target, 'foo');
assert(foo.value.name = 'foo (bound)');

var bar = {
  get: function() { return this.value; }, 
  set: function(value) { this.value = value; }
}
bar = bind.call(bar, target, 'bar');
assert(bar.get.name = 'bar (bound)');
assert(bar.set.name = 'bar (bound)');

var host = { id: 'host' };
Object.defineProperties(host, { foo, bar });

assert(host.foo() == target);
host.bar = 0;
assert(host.bar == target.value);
