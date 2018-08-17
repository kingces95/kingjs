'use strict';

var forEachDependent = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var assertThrows = testRequire('@kingjs/assert-throws');
var assertTheory = testRequire('@kingjs/assert-theory');

function readMe() {
  var poset = {
    a: [ 'b', 'c' ],
    b: [ 'd' ],
    c: [ 'd' ]
  };
  
  var totalOrder = [];
  
  forEachDependent(function(vertex) {
    totalOrder.push(vertex);
  }, poset);

  assert(totalOrder.length == 4);
  assert(totalOrder[0] == 'd');
  assert(totalOrder[3] == 'a');

  assert(totalOrder[1] != totalOrder[2]);
  assert(totalOrder[1] == 'b' || totalOrder[1] == 'c');
  assert(totalOrder[2] == 'b' || totalOrder[2] == 'c');
}
readMe();

function cycle() {
  var poset = {
    a: [ 'b' ],
    b: [ 'c' ],
    c: [ 'a' ],
  };
  
  var message = assertThrows(function() {
    forEachDependent(null, poset)
  }, 'Cycle detected: a > b > c > a');
}
cycle();

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
    forEachDependent(function(vertexName) {
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
  }, {
    a: [ 0 ],
    b: [ 0, 1 ],
    c: [ 0, 1, 2 ],
    d: [ 0, 1, 2, 3 ],
    e: [ 4 ]
  })
}
manyGraphs();
