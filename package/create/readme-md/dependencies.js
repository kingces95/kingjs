module.exports = {
  "@kingjs": {
    array: {
      Expand: require("@kingjs/array.expand")
    },
    fs: {
      Probe: require("@kingjs/fs.probe"),
      file: {
        Expand: require("@kingjs/fs.file.expand"),
        Read: require("@kingjs/fs.file.read")
      },
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
      name: {
        parse: require("@kingjs/package.name.parse")
      },
      source: {
        parse: {
          sourceFile: {
            GetFirstDocumented: require("@kingjs/package.source.parse.source-file.get-first-documented")
          }
        }
      }
    },
    path: {
      Builder: require("@kingjs/path.builder")
    },
    pojo: {
      ToPairs: require("@kingjs/pojo.to-pairs")
    },
    source: {
      GetInfo: require("@kingjs/source.get-info"),
      Parse: require("@kingjs/source.parse")
    }
  }
}