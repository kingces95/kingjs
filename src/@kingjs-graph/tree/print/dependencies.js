module.exports = {
  assert: require("assert"),
  "@kingjs": {
    graph: {
      Analyze: require("@kingjs/graph.analyze")
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    reflect: {
      is: require("@kingjs/reflect.is")
    }
  }
}