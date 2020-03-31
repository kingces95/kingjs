var ts = require('typescript')

var {
  typescript: ts2,
  ['@kingjs']: { 
    extendClass,
    source: {
      syntaxKind
    }
  }
} = require('./dependencies');

class Node { 

  // enumerate the children
  * [Symbol.iterator]() {
  
    for (var name in this) {
      var value = this[name];
  
      if (value instanceof Array) {
        for (var element of value) {
          if (element instanceof Node)
            yield element;
        }
      }
  
      else if (value instanceof Node)
          yield value;
    }
  }
}

for (var name in syntaxKind) {

  if (syntaxKind.isToken(name))
    continue;

  if (syntaxKind.isKeyword(name))
    continue;

  exports[name] = extendClass(name, Node)
}

class Identifier extends Node {
  emit() {
    return ts.cre
  }
}

exports['Node'] = Node
exports['Identifier'] = Identifier