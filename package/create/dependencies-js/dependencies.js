module.exports = {
  fs: require("fs"),
  Path: require("path"),
  assert: require("assert"),
  "@kingjs": {
    path: {
      Builder: require('@kingjs/path.builder')
    },
    fs: {
      promises: {
        Exists: require('@kingjs/fs.promises.exists'),
        WriteFile: require('@kingjs/fs.promises.file.write'),
      }
    },
    pojo: {
      Map: require('@kingjs/pojo.map'),
      promises: {
        Map: require('@kingjs/pojo.promises.map')
      }
    },
    json: {
      file: {
        Read: require("@kingjs/json.file.read")
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