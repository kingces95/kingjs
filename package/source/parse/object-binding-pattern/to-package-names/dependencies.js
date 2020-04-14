exports['@kingjs'] = {
  source: {
    types: require('@kingjs/source.types')
  },
  camelCase: { 
    split: require('@kingjs/camel-case.split')
  },
  package: {
    name: {
      construct: require('@kingjs/package.name.construct')
    },
  },
  reflect: {
    is: require('@kingjs/reflect.is')
  },
  module: { ExportExtension: require('@kingjs/module.export-extension') },
}
exports.Path = require('path')
exports.assert = require('assert')
exports.isBuiltinModule = require('is-builtin-module')