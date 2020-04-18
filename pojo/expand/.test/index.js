var assert = require('assert')
var Expand = require('..')

var pairs = {
  p0: 0,
  p1: 1
}

var actual = pairs[Expand]("${key}${eq}${value}", { eq: '=' }, ', ')
assert.equal(actual, 'p0=0, p1=1')