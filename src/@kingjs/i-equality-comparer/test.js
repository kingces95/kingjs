var assert = require('assert')
var IEqualityComparer = require('@kingjs/i-equality-comparer')

assert.equal(IEqualityComparer.name, 'IEqualityComparer')

assert.equal(
  IEqualityComparer.Equals, 
  Symbol.for('IEqualityComparer.equals, @kingjs')
)

assert.equal(
  IEqualityComparer.GetHashcode, 
  Symbol.for('IEqualityComparer.getHashcode, @kingjs')
)