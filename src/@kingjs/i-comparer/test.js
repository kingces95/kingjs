var assert = require('assert')
var IComparer = require('@kingjs/i-comparer')

assert.equal(IComparer.name, 'IComparer')

assert.equal(
  IComparer.IsLessThan, 
  Symbol.for('IComparer.isLessThan, @kingjs')
)

assert.equal(
  IComparer.Equals, 
  Symbol.for('IEqualityComparer.equals, @kingjs')
)

assert.equal(
  IComparer.GetHashcode, 
  Symbol.for('IEqualityComparer.getHashcode, @kingjs')
)