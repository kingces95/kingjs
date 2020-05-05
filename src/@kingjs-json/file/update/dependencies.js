exports['@kingjs'] = {
  module: {
    ExportExtension: require('@kingjs/module.export-extension')
  },
  Path: require('@kingjs/path'),
  json: {
    file: {
      read: require('@kingjs/json.file.read'),
      write: require('@kingjs/json.file.write')
    }
  }
}