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
    path: {
      Builder: require("@kingjs/path.builder")
    },
    stringEx: {
      Builder: require("@kingjs/string-ex.builder")
    }
  }
}