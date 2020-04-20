module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  Path: require("path"),
  "@kingjs": {
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
      resolve: {
        NpmScope: require("@kingjs/package.resolve.npm-scope")
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
    source: {
      GetInfo: require("@kingjs/source.get-info"),
      Parse: require("@kingjs/source.parse")
    },
    stringEx: {
      ReplaceAll: require("@kingjs/string-ex.replace-all")
    }
  }
}