module.exports = {
  assert: require("assert"),
  Path: require("path"),
  "@kingjs": {
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    source: {
      types: require("@kingjs/source.types")
    }
  }
}