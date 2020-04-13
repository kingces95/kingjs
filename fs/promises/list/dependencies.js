module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  "@kingjs": {
    array: {
      Partition: require("@kingjs/array.partition")
    },
    defineExtension: require("@kingjs/define-extension"),
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}