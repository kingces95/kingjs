module.exports = {
  fs: require("fs"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        dir: {
          Make: require("@kingjs/fs.promises.dir.make")
        }
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}