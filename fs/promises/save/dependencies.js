module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  path: require("path"),
  '@kingjs': {
    module: { ExportExtension: require('@kingjs/module.export-extension') },
    path: {
      Builder: require("@kingjs/path.builder"),
    },
    reflect: {
      is: require('@kingjs/reflect.is')
    },
    json: { 
      stringify: require('@kingjs/json.stringify')
    },
    fs: {
      promises: {
        WriteFile: require("@kingjs/fs.promises.file.write"),
        MakeDir: require("@kingjs/fs.promises.dir.make"),
      }
    }
  }
}