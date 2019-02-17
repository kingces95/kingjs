exports['@kingjs'] = {
  is: require('@kingjs/is'),
  git: {
    getDir: require('@kingjs/git.get-dir'),
  },
  stringEx: {
    ReplaceAll: require('@kingjs/string-ex.replace-all'),
  },
  parseSource: require('@kingjs/parse-source'),
}
exports['typescript'] = require('typescript')