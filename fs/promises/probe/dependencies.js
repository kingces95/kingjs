module.exports = {
  Path: require("path"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}