exports['fs'] = require('fs')
exports['@kingjs'] = {
  fs: { 
    promises: { 
      exists: require('@kingjs/fs.promises.exists')
    } 
  }
}