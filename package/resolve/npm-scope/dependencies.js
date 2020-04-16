module.exports = {
  assert: require("assert"),
  "@kingjs": {
    fs: {
      promises: {
        dir: {
          FindRoot: require("@kingjs/fs.promises.dir.find-root")
        }
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