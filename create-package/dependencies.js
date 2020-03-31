exports['@kingjs'] = {
  array: {
    promises: {
      map: require('@kingjs/array.promises.map')
    }
  },
  camelCase: {
    split: require('@kingjs/camel-case.split'),
  },
  git: {
    getDir: require('@kingjs/git.get-dir'),
  },
  package: { 
    name: {
      parse: require('@kingjs/package.name.parse'),
      construct: require('@kingjs/package.name.construct'),
    },
  },
  parseSource: require('@kingjs/parse-source'),
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  stringEx: {
    ReplaceAll: require('@kingjs/string-ex.replace-all'),
  },
}
exports['isBuiltinModule'] = require('is-builtin-module')
exports['npmPacklist'] = require('npm-packlist')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')