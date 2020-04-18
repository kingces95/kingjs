module.exports = {
  Path: require("path"),
  "@kingjs": {
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}