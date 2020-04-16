module.exports = {
  assert: require("assert"),
  Path: require("path"),
  "@kingjs": {
    buffer: {
      Append: require("@kingjs/buffer.append")
    },
    pojo: {
      ToArray: require("@kingjs/pojo.to-array")
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    }
  }
}