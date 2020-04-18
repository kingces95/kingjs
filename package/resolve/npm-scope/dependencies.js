module.exports = {
  assert: require("assert"),
  "@kingjs": {
    fs: {
      promises: {
        Probe: require("@kingjs/fs.promises.probe")
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