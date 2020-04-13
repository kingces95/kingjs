module.exports = {
  assert: require("assert"),
  fs: require("fs"),
  path: require("path"),
  '@kingjs': {
    defineExtension: require('@kingjs/define-extension'),
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
        WriteFile: require("@kingjs/fs.promises.write-file"),
        MakeDir: require("@kingjs/fs.promises.make-dir"),
      }
    }
  }
}