module.exports = {
  assert: require("assert"),
  "@kingjs": {
    fs: {
      promises: {
        file: {
          Write: require("@kingjs/fs.promises.file.write")
        }
      }
    },
    json: {
      stringify: require("@kingjs/json.stringify")
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    Path: require("@kingjs/path")
  }
}