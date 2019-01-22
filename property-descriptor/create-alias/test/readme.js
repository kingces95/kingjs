var assert = require('assert');
var createAlias = require('..');

// alias a function; foo -> Foo
var fooDescriptor = createAlias('Foo', true);
assert(fooDescriptor.value.name = 'Foo (alias)');
var target = Object.defineProperty({ Foo: () => 0 }, 'foo', fooDescriptor);
assert(target.foo() == 0);

// alias an accessor; bar -> Bar
var barDescriptor = createAlias('Bar');
assert(barDescriptor.get.name = 'Bar (alias)');
assert(barDescriptor.set.name = 'Bar (alias)');
var target = Object.defineProperty({ Bar: 1 }, 'bar', barDescriptor);
assert(target.bar == 1);
target.bar = 2;
assert(target.Bar == 2);