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
    Path: require("@kingjs/path"),
  }
}