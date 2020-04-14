module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  "@kingjs": {
    array: {
      Partition: require("@kingjs/array.partition")
    },
    module: { ExportExtension: require("@kingjs/module.export-extension") },
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}