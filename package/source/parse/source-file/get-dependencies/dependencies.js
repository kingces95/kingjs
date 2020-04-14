exports['@kingjs'] = {
  source: {
    types: require('@kingjs/source.types')
  },
  module: { ExportExtension: require('@kingjs/module.export-extension') },
}
exports.Path = require('path')
exports.assert = require('assert')