module.exports = {
  "@kingjs": {
    Path: require("@kingjs/path"),
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
      scope: {
        Probe: require("@kingjs/package.scope.probe")
      },
      source: {
        parse: {
          sourceFile: {
            GetFirstDocumented: require("@kingjs/package.source.parse.source-file.get-first-documented")
          }
        }
      }
    },
    pojo: {
      Expand: require("@kingjs/pojo.expand")
    },
    source: {
      GetInfo: require("@kingjs/source.get-info"),
      Parse: require("@kingjs/source.parse")
    }
  }
}