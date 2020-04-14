exports['fs'] = require('fs')
exports['@kingjs'] = {
  module: {
    ExportExtension: require('@kingjs/module.export-extension')
  },
  path: {
    Builder: require('@kingjs/path.builder')
  },
  json: {
    stringify: require('@kingjs/json.stringify'),
  }
}