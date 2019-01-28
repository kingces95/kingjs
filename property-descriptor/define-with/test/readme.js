var assert = require('assert');
var construct = require('@kingjs/property-descriptor.construct-property')
var defineWith = require('..');

var defineProperty = defineWith.bind({
  construct,
  defaults: {
    enumerable: true,
    writable: true,
  }
});

var target = defineProperty({ }, 'foo', 0);
var descriptor = Object.getOwnPropertyDescriptor(target, 'foo');
assert(descriptor.enumerable == true);
assert(descriptor.configurable == false);
assert(descriptor.writable == true);
assert(descriptor.value == 0);