module.exports = {
  assert: require("assert"),
  isBuiltinModule: require("is-builtin-module"),
  "@kingjs": {
    buffer: {
      Append: require("@kingjs/buffer.append")
    },
    package: {
      name: {
        construct: require("@kingjs/package.name.construct"),
        parse: require("@kingjs/package.name.parse")
      }
    },
    Path: require("@kingjs/path"),
    stringEx: {
      Builder: require("@kingjs/string-ex.builder")
    }
  }
}