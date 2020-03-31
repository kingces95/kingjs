exports['@kingjs'] = {
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  source: {
    SyntaxKind: require('@kingjs/source.syntax-kind'),
    types: require('@kingjs/source.types')
  },
}
exports['typescript'] = require('typescript')
exports['fs'] = require('fs')