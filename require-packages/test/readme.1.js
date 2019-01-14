var assert = require('assert');

var {
  lodash,
  ['@kingjs']: { is, camelCase: { split, join } },
} = require('..').call(module);

assert(lodash == require('lodash'));
assert(is == require('@kingjs/is'));
assert(split == require('@kingjs/camel-case.split'));
assert(join == require('@kingjs/camel-case.join'));