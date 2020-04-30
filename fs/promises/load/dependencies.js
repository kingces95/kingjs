module.exports = {
  fs: require("fs"),
  Path: require("path"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        dir: {
          List: require("@kingjs/fs.promises.dir.list"),
          Remove: require("@kingjs/fs.promises.dir.remove")
        },
        file: {
          Read: require("@kingjs/fs.promises.file.read")
        }
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}