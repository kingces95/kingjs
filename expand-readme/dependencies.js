exports['@kingjs'] = {
  stringEx: {
    Expand: require('@kingjs/string-ex.expand'),
    JoinLines: require('@kingjs/string-ex.join-lines'),
  },
  source: {
    parse: require('@kingjs/source.parse'),
    GetInfo: require('@kingjs/source.get-info')
  },
  package: {
    source: {
      parse: {
        sourceFile: {
          GetFirstDocumented: require('@kingjs/package.source.parse.source-file.get-first-documented')
        }
      }
    },
    name: {
      parse: require('@kingjs/package.name.parse')
    }
  }
}
exports['typescript'] = require('typescript')
exports['fs'] = require('fs')
exports['path'] = require('path')
exports['assert'] = require('assert')