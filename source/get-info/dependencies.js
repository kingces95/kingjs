exports['@kingjs'] = {
  source: {
    types: require('@kingjs/source.types'),
    info: {
      FunctionInfo: require('@kingjs/source.info.function-info')
    }
  },
  defineExtension: require('@kingjs/define-extension'),
}
exports.assert = require('assert')