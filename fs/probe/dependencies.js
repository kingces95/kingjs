module.exports = {
  Path: require("path"),
  "@kingjs": {
    fs: {
      Exists: require("@kingjs/fs.exists")
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}