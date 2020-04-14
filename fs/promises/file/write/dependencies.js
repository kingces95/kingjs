module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  "@kingjs": {
    module: {
      ExportExtension: require("@kingjs/module.export-extension"),
    },
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}