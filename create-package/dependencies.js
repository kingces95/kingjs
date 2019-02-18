exports['@kingjs'] = {
  camelCase: {
    split: require('@kingjs/camel-case.split'),
  },
  git: {
    getDir: require('@kingjs/git.get-dir'),
  },
  is: require('@kingjs/is'),
  packageName: {
    construct: require('@kingjs/package-name.construct'),
  },
  parseSource: require('@kingjs/parse-source'),
  stringEx: {
    ReplaceAll: require('@kingjs/string-ex.replace-all'),
  },
}
exports['isBuiltinModule'] = require('is-builtin-module')
exports['npmPacklist'] = require('npm-packlist')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')