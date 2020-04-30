module.exports = {
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      Exists: require("@kingjs/fs.exists"),
      Probe: require("@kingjs/fs.probe"),
      file: {
        Read: require("@kingjs/fs.file.read"),
        Write: require("@kingjs/fs.file.write")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    stringEx: {
      Expand: require("@kingjs/string-ex.expand")
    }
  }
}