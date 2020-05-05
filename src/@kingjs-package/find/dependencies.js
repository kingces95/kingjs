module.exports = {
  assert: require("assert"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    run: require("@kingjs/run"),
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