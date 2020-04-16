module.exports = {
  Path: require("path"),
  "@kingjs": {
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists")
      }
    },
    json: {
      file: {
        read: require("@kingjs/json.file.read"),
        update: require("@kingjs/json.file.update"),
        write: require("@kingjs/json.file.write")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      harvest: {
        dependencies: require("@kingjs/package.harvest.dependencies"),
        metadata: require("@kingjs/package.harvest.metadata")
      },
      resolve: {
        npmScope: require("@kingjs/package.resolve.npm-scope")
      }
    },
    path: {
      Builder: require("@kingjs/path.builder")
    }
  }
}