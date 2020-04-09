exports['@kingjs'] = {
  stringEx: {
    Expand: require('@kingjs/string-ex.expand'),
    JoinLines: require('@kingjs/string-ex.join-lines'),
  },
  fs: {
    promises: {
      exists: require('@kingjs/fs.promises.exists')
    }
  }
}
exports['typescript'] = require('typescript')
exports['fs'] = require('fs')
exports['Path'] = require('path')
exports['assert'] = require('assert')