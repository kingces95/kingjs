var delimiter = '$';
  
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