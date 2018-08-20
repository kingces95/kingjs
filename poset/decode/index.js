'use strict';

var Dictionary = require('@kingjs/dictionary');
var delimiter = '$';
  
function decodeGraph(vertices) {
  var edges = new Dictionary();
       
  for (var name in this) {

    if (name.indexOf(delimiter) == -1) {
      vertices[name] = this[name];
    }
    else {
      var split = name.split(delimiter);
      var vertexName = split.shift();
      
      vertices[vertexName] = this[name];

      if (split.length == 0)
        continue;

        edges[vertexName] = split;
    }
  };

  return edges;
}

Object.defineProperties(module, {
  exports: { value: decodeGraph }
});