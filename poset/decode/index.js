var {
  ['@kingjs']: {
    Dictionary
  }
} = require('./dependencies');

var Delimiter = '$';
  
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