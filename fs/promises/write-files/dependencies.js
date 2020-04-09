module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  path: require("path"),
  '@kingjs': {
    reflect: {
      is: require('@kingjs/reflect.is')
    },
    json: { 
      stringify: require('@kingjs/json.stringify')
    }
  }
}