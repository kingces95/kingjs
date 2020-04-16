module.exports = {
  assert: require("assert"),
  fs: require("fs"),
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