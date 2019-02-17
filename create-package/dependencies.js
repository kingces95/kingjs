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
exports['assert'] = require('assert')
exports['path'] = require('path')
exports['fs'] = require('fs')