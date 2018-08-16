'use strict';

var Dictionary = require('@kingjs/dictionary');
var delimiter = '$';
  
function decodeGraph(poset) {
  var vertices = new Dictionary();
  var edges = new Dictionary();
       
  for (var name in poset) {

    if (name.indexOf(delimiter) == -1) {
      vertices[name] = poset[name];
    }
    else {
      var split = name.split(delimiter);
      var vertexName = split.shift();
      
      vertices[vertexName] = poset[name];

      if (split.length == 0)
        continue;

        edges[vertexName] = split;
    }
  };
  
  return {
    vertices: vertices,
    edges: edges
  };
}

Object.defineProperties(module, {
  exports: { value: decodeGraph }
});