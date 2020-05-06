var assert = require('assert');

var { 
  '@kingjs': {
    package: { name: { parse } },
    camelCase: { join }
  }
} = module[require('@kingjs-module/dependencies')]();

assert(parse);
assert(join);