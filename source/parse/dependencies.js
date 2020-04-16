module.exports = {
  assert: require("assert"),
  typescript: require("typescript"),
  "@kingjs": {
    fs: {
      promises: {
        file: {
          Read: require("@kingjs/fs.promises.file.read")
        }
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    path: {
      Builder: require("@kingjs/path.builder")
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    },
    source: {
      SyntaxKind: require("@kingjs/source.syntax-kind"),
      types: require("@kingjs/source.types")
    }
  }
}