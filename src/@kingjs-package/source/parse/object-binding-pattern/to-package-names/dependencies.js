module.exports = {
  isBuiltinModule: require("is-builtin-module"),
  "@kingjs": {
    defineExtension: require("@kingjs/define-extension"),
    camelCase: {
      split: require("@kingjs/camel-case.split")
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      name: {
        construct: require("@kingjs/package.name.construct")
      }
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    },
    source: {
      types: require("@kingjs/source.types")
    }
  }
}