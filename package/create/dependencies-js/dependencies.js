module.exports = {
  fs: require("fs"),
  Path: require("path"),
  assert: require("assert"),
  "@kingjs": {
    pojo: {
      Map: require('@kingjs/pojo.map'),
      promises: {
        Map: require('@kingjs/pojo.promises.map')
      }
    },
    json: {
      file: {
        read: require("@kingjs/json.file.read")
      }
    },
    package: {
      source: {
        generate: {
          dependencies: require("@kingjs/package.source.generate.dependencies")
        }
      }
    }
  }
}