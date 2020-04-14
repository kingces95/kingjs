exports['@kingjs'] = {
  module: {
    ExportExtension: require('@kingjs/module.export-extension')
  },
  path: {
    Builder: require('@kingjs/path.builder')
  },
  json: {
    file: {
      read: require('@kingjs/json.file.read'),
      write: require('@kingjs/json.file.write')
    }
  }
}