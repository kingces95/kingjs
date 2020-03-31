var { 
  assert,
  ['@kingjs']: { 
    defineExtension,
    source: { 
      types,
      info: { FunctionInfo }
    }
  }
} = require('./dependencies')

var { Node, FunctionDeclaration } = types
var { name, version } = require('./package.json');

function getInfo() {
  if (this instanceof FunctionDeclaration)
    return new FunctionInfo(this)
}

module.exports = defineExtension(
  Node.prototype, name, version, getInfo
);