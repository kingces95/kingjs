module.exports = {
  fs: require("fs"),
  Path: require("path"),
  "@kingjs": {
    json: {
      file: {
        read: require('@kingjs/json.file.read')
      }
    },
    package: {
      source: {
        generate: {
          dependencies: require('@kingjs/package.source.generate.dependencies')
        }
      }
    }
  }
}