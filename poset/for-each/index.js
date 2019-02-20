var {
  ['@kingjs']: {
    Dictionary
  }
} = require('./dependencies');

var noop = function() { };

/** 
 * @description Invokes a callback on vertices of 
 * a poset such that dependent vertices are called 
 * back first.
 * 
 * @this any A poset expressed as an descriptor where 
 * each property represents a named vertex and each 
 * property value is an array of strings each representing 
 * the name of adjacent vertices.
 * @param {*} action Action to take when visiting a vertex.
 * @param {*} action.vertex The name of the vertex being visited.
 * @param {*} roots The vertex or vertices from which to commence 
 * the traversal. If none are provided, all vertices are used as roots. 
 * 
 * @remarks - If a cycle is detected, then an exception is 
 * thrown listing the vertices involved in the cycle.
 * @remarks - Algorithm will _randomly_ decide the direction to 
 * traverse the adjacency vertices. This helps callers ensure 
 * they only rely on dependencies defined in the adjacency 
 * list and not on dependencies  that are artifacts of its 
 * expression. This is why the example in the usage section 
 * may generate two different results.  
 */
function forEach(action, roots) {
  if (!roots)
    roots = Object.keys(this);
  else if (typeof roots == 'string')
    roots = [ roots ];

  if (!action)
    action = noop;

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
      var adjacentVertexNames = this[vertexName];
      if (adjacentVertexNames) {

        if (_traverseForward) {
          for (var i = 0; i < adjacentVertexNames.length; i++)
            visit.call(this, adjacentVertexNames[i]);
        }

        else {
          for (var i = adjacentVertexNames.length -1; i >= 0; i--)
            visit.call(this, adjacentVertexNames[i]);
        }
      }
      
      // process vertex
      action.call(this, vertexName, _stack);
    }

    // epilog
    _stack.pop();
    delete _onStack[vertexName];
  }

  for (var i = 0; i < roots.length; i++)
    visit.call(this, roots[i]); 
}

module.exports = forEach;