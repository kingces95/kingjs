'use strict';

var copy = require('@kingjs/mutate.copy');
var forEach = require('@kingjs/poset.for-each');
var Dictionary = require('@kingjs/dictionary');

function inherit(vertices) {   

  forEach.call(this,
    function(name) {
      var vertex = vertices[name];
      
      var adjacentNames = this[name];
      if (!adjacentNames || adjacentNames.length == 0)
        return;

      var values = new Dictionary();

      for (var i = 0; i < adjacentNames.length; i++) {
        var adjacentName = adjacentNames[i];
        var adjacentVertex = vertices[adjacentName];

        // throw on ambiguous inherited values
        copy.call(values, adjacentVertex, function(propertyName) {
          if (propertyName in vertex)
            return true;

          if (values[propertyName] == adjacentVertex[propertyName])
            return true;

          throw '"' + name + 
            '" inherits an ambiguous value for property "' + propertyName + 
            '".';
        });
      }

      copy.call(vertex, values, true);
    }, 
    Object.keys(vertices)
  );
  
  return vertices;
}

Object.defineProperties(module, {
  exports: { value: inherit }
});