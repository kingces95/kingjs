module.exports = {
  fs: require("fs"),
  "@kingjs": {
    defineExtension: require('@kingjs/define-extension'),
    path: {
      Builder: require("@kingjs/path.builder"),
    },
    run: require("@kingjs/run"),
    fs: {
      promises: {
        ReadFile: require("@kingjs/fs.promises.read-file"),
        WriteFile: require("@kingjs/fs.promises.write-file"),
        CopyFile: require("@kingjs/fs.promises.copy-file"),
        MakeDir: require("@kingjs/fs.promises.make-dir"),
        List: require("@kingjs/fs.promises.list")
      }
    }
  }
}