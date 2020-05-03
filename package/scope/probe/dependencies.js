module.exports = {
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        Probe: require("@kingjs/fs.promises.probe")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}