var {
  ['@kingjs']: {
    descriptor: { inherit },
    poset: { forEach },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Inherits properties of dependent vertices.
 * 
 * @this any A descriptor whose every property represents 
 * a vertex and whose value is an array of strings representing 
 * the vertex's adjacent vertices.
 * @param {*} vertices A descriptor whose every property 
 * represents a vertex and whose value represents the properties 
 * associated with the vertex.
 * 
 * @returns A descriptor with a property for each vertex whose 
 * value is a descriptor which inherits the properties of its 
 * dependent vertices. 
 * 
 * @remarks Throws if inherited properties that share the same 
 * name do not also have the same value.
 */
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

      return inherit.call(target, bases);
    }, 
    Object.keys(vertices)
  );
  
  return vertices;
}

module.exports = posetInherit