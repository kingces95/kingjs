exports['fs'] = require('fs')
exports['@kingjs'] = {
  module: {
    ExportExtension: require('@kingjs/module.export-extension')
  },
  Path: require('@kingjs/path'),
  fs: { 
    promises: { 
      file: {
        Read: require('@kingjs/fs.promises.file.read')
      },
      Exists: require('@kingjs/fs.promises.exists')
    } 
  }
}