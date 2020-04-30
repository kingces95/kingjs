module.exports = {
  Path: require("path"),
  assert: require("assert"),
  "@kingjs": {
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists"),
        dir: {
          Copy: require("@kingjs/fs.promises.dir.copy"),
          Make: require("@kingjs/fs.promises.dir.make")
        }
      }
    },
    json: {
      file: {
        Read: require("@kingjs/json.file.read"),
        Update: require("@kingjs/json.file.update"),
        Write: require("@kingjs/json.file.write")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      harvest: {
        Dependencies: require("@kingjs/package.harvest.dependencies"),
        Metadata: require("@kingjs/package.harvest.metadata")
      },
      resolve: {
        NpmScope: require("@kingjs/package.resolve.npm-scope")
      }
    },
    Path: require("@kingjs/path")
  }
}