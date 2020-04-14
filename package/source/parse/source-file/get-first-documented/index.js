var { 
  ['@kingjs']: { 
    module: { ExportExtension },
    source: { types }
  }
} = require('./dependencies')

var { name, version } = require('./package.json');
var { SourceFile, FunctionDeclaration } = types

function getFirstDocumented() {
  if (this instanceof FunctionDeclaration && this.jsDoc)
    return this      

  for (var child of this) {
    var result = getFirstDocumented.call(child)
    if (result)
      return result
  }
}

module.exports = defineExtension(
  SourceFile.prototype, name, version, getFirstDocumented
)