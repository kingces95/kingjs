module.exports = {
  Path: require("path"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        dir: {
          List: require("@kingjs/fs.promises.dir.list")
        }
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}