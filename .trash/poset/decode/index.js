var {
  ['@kingjs']: {
    Dictionary
  }
} = require('./dependencies');

var Delimiter = '$';
  
/**
 * @description Decodes a descriptor 
 * representing a poset into an adjacency 
 * list and a vertex property map.
 * 
 * @this any An encoded poset.
 * @param {*} vertices A out descriptor augmented 
 * with vertex properties.
 * 
 * @returns An descriptor with a property for 
 * every vertex that has adjacent vertices. 
 * Each property value is an array of names of 
 * the adjacent vertices. 
 */
function decodeGraph(vertices) {
  var edges = new Dictionary();
       
  for (var name in this) {

    if (name.indexOf(Delimiter) == -1) {
      vertices[name] = this[name];
    }
    else {
      var split = name.split(Delimiter);
      var vertexName = split.shift();
      
      vertices[vertexName] = this[name];

      if (split.length == 0)
        continue;

        edges[vertexName] = split;
    }
  };

  return edges;
}

module.exports = decodeGraph;