module.exports = {
  fs: require("fs"),
  path: require("path"),
  "@kingjs": {
    json: {
      file: {
        update: require('@kingjs/json.file.update')
      }
    },
    package: {
      findNpmScope: require("@kingjs/package.find-npm-scope"),
      harvest: {
        dependencies: require("@kingjs/package.harvest.dependencies"),
        metadata: require("@kingjs/package.harvest.metadata")
      }
    }
  }
}