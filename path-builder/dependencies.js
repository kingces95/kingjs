module.exports = {
  assert: require("assert"),
  Path: require("path"),
  "@kingjs": {
    Exception: require("@kingjs/exception"),
    buffer: {
      Append: require("@kingjs/buffer.append")
    },
    pojo: {
      ToArray: require("@kingjs/pojo.to-array")
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    },
    stringEx: {
      builder: require("@kingjs/string-ex.builder")
    }
  }
}