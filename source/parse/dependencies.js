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
    Path: require("@kingjs/path"),
    reflect: {
      is: require("@kingjs/reflect.is")
    },
    source: {
      SyntaxKind: require("@kingjs/source.syntax-kind"),
      types: require("@kingjs/source.types")
    }
  }
}