var assert = require('assert');
var createAlias = require('..');

// alias a function; foo -> Foo
var { target, name, descriptor } = createAlias({ Foo: () => 0 }, 'foo', 'Foo', true);
assert(descriptor.value.name = 'foo -> Foo');
Object.defineProperty(target, name, descriptor);

// get Foo via foo
assert(target.foo() == 0);

// alias an accessor; bar -> Bar
var { target, name, descriptor } = createAlias({ Bar: 1 }, 'bar', 'Bar');
assert(descriptor.get.name = 'bar -> Bar');
assert(descriptor.set.name = 'bar -> Bar');
Object.defineProperty(target, name, descriptor);

// get Bar via bar
assert(target.bar == 1);

// set Bar via bar
target.bar = 2;
assert(target.Bar == 2);