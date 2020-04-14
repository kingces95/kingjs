exports['@kingjs'] = {
  source: {
    types: require('@kingjs/source.types'),
    info: {
      FunctionInfo: require('@kingjs/source.info.function-info')
    }
  },
  module: { ExportExtension: require('@kingjs/module.export-extension') },
}
exports.assert = require('assert')