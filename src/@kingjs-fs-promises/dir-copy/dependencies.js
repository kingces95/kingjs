module.exports = {
  "@kingjs": {
    Path: require("@kingjs/path"),
    run: require("@kingjs/run"),
    array: {
      Partition: require("@kingjs/array.partition")
    },
    fs: {
      promises: {
        dir: {
          List: require("@kingjs/fs.promises.dir.list"),
          Make: require("@kingjs/fs.promises.dir.make")
        },
        file: {
          Copy: require("@kingjs/fs.promises.file.copy"),
          Read: require("@kingjs/fs.promises.file.read"),
          Write: require("@kingjs/fs.promises.file.write")
        }
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    }
  }
}