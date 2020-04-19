module.exports = {
  assert: require("assert"),
  Path: require("path"),
  isBuiltinModule: require("is-builtin-module"),
  npmPacklist: require("npm-packlist"),
  "@kingjs": {
    array: {
      promises: {
        Map: require("@kingjs/array.promises.map")
      }
    },
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
        parse: require("@kingjs/package.name.parse")
      },
      resolve: {
        NpmScope: require("@kingjs/package.resolve.npm-scope")
      },
      source: {
        parse: {
          objectBindingPattern: {
            ToPackageNames: require("@kingjs/package.source.parse.object-binding-pattern.to-package-names")
          },
          sourceFile: {
            GetDependencies: require("@kingjs/package.source.parse.source-file.get-dependencies")
          }
        }
      }
    },
    path: {
      Builder: require("@kingjs/path.builder")
    },
    source: {
      Parse: require("@kingjs/source.parse")
    },
    stringEx: {
      ReplaceAll: require("@kingjs/string-ex.replace-all")
    }
  }
}