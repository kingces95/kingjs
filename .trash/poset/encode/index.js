var delimiter = '$';
  
/**
 * @description Encodes an adjacency list and vertex 
 * property map into a descriptor whose property 
 * names, when split on `$`, reveal a vertex name 
 * followed by its adjacent vertices, and whose property 
 * values correspond to vertex properties.
 * 
 * @this any A descriptor whose properties are 
 * vertex names and whose values are vertex properties.
 * @param {*} vertices A descriptor whose properties are
 * vertex names and whose values are arrays containing 
 * the names of adjacent vertices.
 * 
 * @return Returns a descriptor whose every property name 
 * is a join by `'$'` of a vertex name followed by its 
 * adjacent vertices.
 */
function encodePoset(vertices) {
  var poset = { };
  
  for (var name in vertices) {
    var encodedName = name;

    var list = this[name];
    if (list && list.length > 0)
      encodedName += delimiter + list.join(delimiter);

    poset[encodedName] = vertices[name];
  }
  
  return poset;
}

module.exports = encodePoset;