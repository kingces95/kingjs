var assert = require('assert')
var IComparable = require('@kingjs/i-comparable')

assert.equal(IComparable.name, 'IComparable')

assert.equal(
  IComparable.IsLessThan, 
  Symbol.for('IComparable.compareTo, @kingjs')
)