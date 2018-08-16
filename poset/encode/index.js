'use strict';

var delimiter = '$';
  
function encodePoset(vertices, edges) {
  var poset = { };
  
  for (var name in vertices) {
    var encodedName = name;

    var list = edges[name];
    if (list && list.length > 0)
      encodedName += delimiter + list.join(delimiter);

    poset[encodedName] = vertices[name];
  }
  
  return poset;
}

Object.defineProperties(module, {
  exports: { value: encodePoset }
});