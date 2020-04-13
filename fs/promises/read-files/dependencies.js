module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  path: require("path"),
  '@kingjs': {
    defineExtension: require('@kingjs/define-extension'),
    fs: {
      promises: {
        ReadFile: require("@kingjs/fs.promises.read-file"),
        List: require("@kingjs/fs.promises.list")
      }
    },
    path: {
      Builder: require("@kingjs/path.builder"),
    }
  }
}