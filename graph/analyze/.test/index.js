var assert = require('assert')
var Analize = require('..')

// null
var actual = {
}[Analize]()
assert.deepEqual(actual, { 
  roots: null, 
  multiParented: null, 
  cycle: null,
  height: 0
})

// tree
var actual = {
  'A': [ 'B', 'C' ],
  'B': [ 'D' ],
}[Analize]()
assert.deepEqual(actual, { 
  roots: [ 'A' ], 
  multiParented: null, 
  cycle: null,
  height: 3
})

// poset
var actual = {
  'A': [ 'B', 'C' ],
  'B': [ 'D' ],
  'C': [ 'D' ],
}[Analize]()
assert.deepEqual(actual, { 
  roots: [ 'A' ], 
  multiParented: { D: [ 'B', 'C' ] }, 
  cycle: null,
  height: 3
})

// cycle
var actual = {
  'A': [ 'A' ],
}[Analize]()
assert.deepEqual(actual, { 
  roots: null, 
  multiParented: null, 
  cycle: [ 'A', 'A' ],
  height: undefined
})

// cycle
var actual = {
  'A': [ 'B' ],
  'B': [ 'C' ],
  'C': [ 'D' ],
  'D': [ 'B' ]
}[Analize]()
assert.deepEqual(actual, {
  roots: [ 'A' ],
  multiParented: { B: [ 'A', 'D' ] },
  cycle: [ 'B', 'C', 'D', 'B' ],
  height: undefined
})