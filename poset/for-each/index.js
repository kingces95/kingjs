'use strict';

var Dictionary = require('@kingjs/dictionary');

var emptyDictionary = new Dictionary();
var noop = function() { };

function walkGraph(action, edges, roots) {
  if (!roots)
    roots = Object.keys(edges);
  else if (typeof roots == 'string')
    roots = [ roots ];

  if (!action)
    action = noop;

  if (!edges)
  edges = emptyDictionary;
  
  var visited = new Dictionary();

  // ensures callers rely on explicit dependencies
  var _traverseForward = Math.random() > 0.5;

  // ensures the graph has no cycles
  var _stack = [];
  var _onStack = new Dictionary();

  function visit(vertexName) {

    // prolog; test for cycles
    _stack.push(vertexName);
    if (vertexName in _onStack)
      throw "Cycle detected: " + _stack.join(' > ');
    _onStack[vertexName] = undefined;
  
    // bail if dependency already processed
    if (vertexName in visited == false) {
      visited[vertexName] = undefined;

      // traverse adjacent vertices
      var adjacentVertexNames = edges[vertexName];
      if (adjacentVertexNames) {

        if (_traverseForward) {
          for (var i = 0; i < adjacentVertexNames.length; i++)
            visit(adjacentVertexNames[i]);
        }

        else {
          for (var i = adjacentVertexNames.length -1; i >= 0; i--)
            visit(adjacentVertexNames[i]);
        }
      }
      
      // process vertex
      action.call(this, vertexName);
    }

    // epilog
    _stack.pop();
    delete _onStack[vertexName];
  }

  for (var i = 0; i < roots.length; i++)
    visit(roots[i]); 
}

Object.defineProperties(module, {
  exports: { value: walkGraph }
});