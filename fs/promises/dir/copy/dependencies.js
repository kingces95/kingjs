module.exports = {
  fs: require("fs"),
  "@kingjs": {
    module: { ExportExtension: require('@kingjs/module.export-extension') },
    path: {
      Builder: require("@kingjs/path.builder"),
    },
    run: require("@kingjs/run"),
    fs: {
      promises: {
        ReadFile: require("@kingjs/fs.promises.file.read"),
        WriteFile: require("@kingjs/fs.promises.file.write"),
        CopyFile: require("@kingjs/fs.promises.file.copy"),
        MakeDir: require("@kingjs/fs.promises.dir.make"),
        List: require("@kingjs/fs.promises.dir.list")
      }
    }
  }
}