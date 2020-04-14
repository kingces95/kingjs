module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  path: require("path"),
  '@kingjs': {
    module: { ExportExtension: require('@kingjs/module.export-extension') },
    fs: {
      promises: {
        file: {
          Read: require("@kingjs/fs.promises.file.read"),
        },
        Load: require("@kingjs/fs.promises.load"),
        List: require("@kingjs/fs.promises.dir.list")
      }
    },
    path: {
      Builder: require("@kingjs/path.builder"),
    }
  }
}