'use strict';

var inherit = require('@kingjs/mutate.inherit');
var forEach = require('@kingjs/poset.for-each');

function posetInherit(vertices) {   

  forEach.call(this,
    function(name) {
      var target = vertices[name];
      
      var adjacentNames = this[name];
      if (!adjacentNames || adjacentNames.length == 0)
        return;

      var bases = adjacentNames.map(function(adjacentName) {
        return vertices[adjacentName];
      })

      inherit.call(target, bases);
    }, 
    Object.keys(vertices)
  );
  
  return vertices;
}

Object.defineProperties(module, {
  exports: { value: posetInherit }
});