var assert = require('assert')
var Dependencies = require('@kingjs-module/dependencies')

var actual = []
module.require = name => actual.push(name)

var {
  fs,
  Path,
  ChildProcess,
  StringDecoder,
  FooBar,
  '@acme': { FooBar },
  '@acme-ns0-ns1': { Baz0 },
  '@acme': { 
    '-ns0-ns1': { Baz1 },
  },
  '@acme': { 
    '-ns0': {
      '-ns1': { Baz2 },
    }
  },
  '@acme-ns0': {
    '-ns1': { Baz3 }
  },
  '@acme': {
    Baz4,
    '-ns1': { 
      Baz5
    }
  },
} = module[Dependencies]()

assert.deepEqual(actual, [
  'fs', 
  'path',
  'child_process', 
  'string_decoder',
  'foo-bar',
  
  '@acme/foo-bar',
  '@acme-ns0-ns1/baz0',
  '@acme-ns0-ns1/baz1',
  '@acme-ns0-ns1/baz2',
  '@acme-ns0-ns1/baz3',
  '@acme/baz4',
  '@acme-ns1/baz5',
])