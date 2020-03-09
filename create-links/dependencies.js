exports['@kingjs'] = {
  git: {
    getDir: require('@kingjs/git.get-dir'),
    getFiles: require('@kingjs/git.get-files'),
  },
  packageName: {
    parse: require('@kingjs/package-name.parse'),
  },
}
exports['shelljs'] = require('shelljs')
exports['fs'] = require('fs')
exports['path'] = require('path')