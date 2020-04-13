var assert = require('assert');
var Expand = require('..');

assert.equal('', [][Expand]('foo', { }, ',', '(', ')'))
assert.equal('(foo)', [{ }][Expand]('foo', { }, ',', '(', ')'))
assert.equal('(foo, foo)', [{ }, { }][Expand]('foo', { }, ', ', '(', ')'))

assert.equal('0:foo/bar', 
  [{ key: 'foo', value: 'bar' }][Expand]('${i}:${key}/${value}')
)

assert.equal('( 0:foo0/bar0, 1:foo1/bar1 )', 
  [
    { key: 'foo0', value: 'bar0' }, 
    { key: 'foo1', value: 'bar1' }
  ]
  [Expand]('${i}${colon}${key}/${value}', { colon: ':' }, ', ', '( ', ' )')
)