module.exports = {
  assert: require("assert"),
  "@kingjs": {
    module: { ExportExtension: require("@kingjs/module.export-extension") },
    run: require("@kingjs/run")
  }
}