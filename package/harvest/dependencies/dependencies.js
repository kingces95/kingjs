module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  Path: require("path"),
  isBuiltinModule: require("is-builtin-module"),
  npmPacklist: require("npm-packlist"),
  "@kingjs": {
    array: {
      promises: {
        Map: require("@kingjs/array.promises.map")
      }
    },
    camelCase: {
      split: require("@kingjs/camel-case.split")
    },
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      name: {
        construct: require("@kingjs/package.name.construct"),
        parse: require("@kingjs/package.name.parse")
      },
      resolve: {
        NpmScope: require("@kingjs/package.resolve.npm-scope")
      },
      source: {
        objectBindingPattern: {
          ToPackageNames: require("@kingjs/package.source.object-binding-pattern.to-package-names")
        },
        sourceFile: {
          GetDependencies: require("@kingjs/package.source.source-file.get-dependencies"),
          GetFirstDocumented: require("@kingjs/package.source.source-file.get-first-documented")
        }
      }
    },
    path: {
      Builder: require("@kingjs/path.builder")
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    },
    source: {
      GetInfo: require("@kingjs/source.get-info"),
      parse: require("@kingjs/source.parse")
    },
    stringEx: {
      ReplaceAll: require("@kingjs/string-ex.replace-all")
    }
  }
}