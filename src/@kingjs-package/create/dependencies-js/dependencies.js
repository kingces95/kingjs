module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists"),
        file: {
          Write: require("@kingjs/fs.promises.file.write")
        }
      }
    },
    json: {
      file: {
        Read: require("@kingjs/json.file.read")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      source: {
        generate: {
          dependencies: require("@kingjs/package.source.generate.dependencies")
        }
      }
    },
    pojo: {
      Map: require("@kingjs/pojo.map"),
      promises: {
        Map: require("@kingjs/pojo.promises.map")
      }
    }
  }
}