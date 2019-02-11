exports['@kingjs'] = {
  git: {
    getDir: require('@kingjs/git.get-dir'),
  },
  packageName: {
    parse: require('@kingjs/package-name.parse'),
  },
}
exports['shelljs'] = require('shelljs')