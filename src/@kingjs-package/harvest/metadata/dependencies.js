module.exports = {
  assert: require("assert"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists")
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
        Builder: require("@kingjs/package.name.builder")
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
    source: {
      GetInfo: require("@kingjs/source.get-info"),
      Parse: require("@kingjs/source.parse")
    },
    stringEx: {
      ReplaceAll: require("@kingjs/string-ex.replace-all")
    }
  }
}