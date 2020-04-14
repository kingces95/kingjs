exports['fs'] = require('fs')
exports['@kingjs'] = {
  module: {
    ExportExtension: require('@kingjs/module.export-extension')
  },
  path: {
    Builder: require('@kingjs/path.builder')
  },
  fs: { 
    promises: { 
      file: {
        Read: require('@kingjs/fs.promises.file.read')
      },
      Exists: require('@kingjs/fs.promises.exists')
    } 
  }
}