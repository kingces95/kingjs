module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  Path: require("path"),
  "@kingjs": {
    fs: {
      promises: {
        exists: require('@kingjs/fs.promises.exists')
      }
    },
    json: {
      file: {
        update: require('@kingjs/json.file.update'),
        read: require('@kingjs/json.file.read'),
        write: require('@kingjs/json.file.write')
      }
    },
    package: {
      resolve: {
        npmScope: require("@kingjs/package.resolve.npm-scope"),
      },
      harvest: {
        dependencies: require("@kingjs/package.harvest.dependencies"),
        metadata: require("@kingjs/package.harvest.metadata")
      }
    }
  }
}