var assert = require('assert');
var ExpandForEach = require('..');

assert.equal('', 'foo'[ExpandForEach]())
assert.equal('', 'foo'[ExpandForEach]({ }))

assert.equal('0:foo/bar', 
  '${i}:${key}/${value}'[ExpandForEach]({ 
    foo: 'bar' 
  })
)

assert.equal('( 0:foo0/bar0, 1:foo1/bar1 )', 
  '${i}${colon}${key}/${value}'[ExpandForEach]({ 
    foo0: 'bar0', 
    foo1: 'bar1' 
  }, { 
    colon: ':'
  }, ', ', '( ', ' )')
)