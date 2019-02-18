exports['@kingjs'] = {
  is: require('@kingjs/is'),
  packageName: {
    construct: require('@kingjs/package-name.construct'),
  },
  camelCase: {
    split: require('@kingjs/camel-case.split'),
  },
  git: {
    getDir: require('@kingjs/git.get-dir'),
  },
  stringEx: {
    ReplaceAll: require('@kingjs/string-ex.replace-all'),
  },
  parseSource: require('@kingjs/parse-source'),
}
exports['typescript'] = require('typescript')
exports['npmPacklist'] = require('npm-packlist')
exports['isBuiltinModule'] = require('is-builtin-module')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')