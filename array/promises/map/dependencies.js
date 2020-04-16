module.exports = {
  assert: require("assert"),
  "@kingjs": {
    run: require("@kingjs/run"),
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}