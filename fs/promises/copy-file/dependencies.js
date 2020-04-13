module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  "@kingjs": {
    defineExtension: require("@kingjs/define-extension"),
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}