module.exports = {
  assert: require("assert"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        dir: {
          Make: require("@kingjs/fs.promises.dir.make")
        },
        file: {
          Write: require("@kingjs/fs.promises.file.write")
        },
        link: {
          Write: require("@kingjs/fs.promises.link.write")
        }
      }
    },
    json: {
      stringify: require("@kingjs/json.stringify")
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    }
  }
}