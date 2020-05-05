module.exports = {
  assert: require("assert"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    fs: {
      promises: {
        Exists: require("@kingjs/fs.promises.exists"),
        dir: {
          Copy: require("@kingjs/fs.promises.dir.copy"),
          Make: require("@kingjs/fs.promises.dir.make")
        },
        link: {
          Write: require("@kingjs/fs.promises.link.write")
        }
      }
    },
    json: {
      file: {
        Read: require("@kingjs/json.file.read"),
        Update: require("@kingjs/json.file.update")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      create: {
        DependenciesJs: require("@kingjs/package.create.dependencies-js")
      },
      harvest: {
        Dependencies: require("@kingjs/package.harvest.dependencies"),
        Metadata: require("@kingjs/package.harvest.metadata")
      },
      name: {
        parse: require("@kingjs/package.name.parse")
      },
      scope: {
        Probe: require("@kingjs/package.scope.probe")
      }
    }
  }
}