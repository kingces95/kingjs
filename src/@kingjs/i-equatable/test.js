var assert = require('assert')
var IEquatable = require('@kingjs/i-equatable')

assert.equal(IEquatable.name, 'IEquatable')

assert.equal(
  IEquatable.Equals, 
  Symbol.for('IEquatable.equals, @kingjs')
)

assert.equal(
  IEquatable.GetHashcode, 
  Symbol.for('IEquatable.getHashcode, @kingjs')
)