require('./readme.js')

var forEach = require('..');
var assert = require('assert');
var assertTheory = require('@kingjs/assert-theory');

function cycle() {
  var poset = {
    a: [ 'b' ],
    b: [ 'c' ],
    c: [ 'a' ],
  };
  
  assert.throws(function() {
    forEach.call(poset)
  });
}
cycle();

return;
function manyGraphs() {
  assertTheory(function(vertices) {

    var adjacencyList = { 
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
    };
    
    // build a poset; add a directed edge to vertices with a lower id
    for (var v in vertices) {
      for (var e in vertices) {
        if (vertices[v] > vertices[e])
          adjacencyList[v].push(e);
      }
    }
    
    // test default empty edge list
    for (var e in adjacencyList) {
      if (adjacencyList[e].length == 0)
        delete adjacencyList[e];
    }
    
    // vertices with value 0 should have no outbound edges, hence a poset
    var lastVertexValue = 0;

    var count = 0;
    forEach.call({
      a: [ 0 ],
      b: [ 0, 1 ],
      c: [ 0, 1, 2 ],
      d: [ 0, 1, 2, 3 ],
      e: [ 4 ]
    }, function(vertexName) {
      count++;
      var vertexValue = vertices[vertexName];

      // sanity checks
      assert(
        typeof vertexValue == 'number' &&
        vertexValue >= 0 && 
        vertexValue <= 4
      );

      // assert depth first walk;
      // assert out bound edges already walked
      assert(vertexValue >= lastVertexValue);

      lastVertexValue = vertexValue;      
    }, adjacencyList, [ 'e' ]);

    assert(count == Object.keys(vertices).length);
  })
}
manyGraphs();
