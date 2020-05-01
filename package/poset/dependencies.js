module.exports = {
  assert: require("assert"),
  "@kingjs": {
    Path: require("@kingjs/path"),
    array: {
      promises: {
        Map: require("@kingjs/array.promises.map")
      }
    },
    graph: {
      poset: {
        ToTree: require("@kingjs/graph.poset.to-tree")
      },
      tree: {
        Print: require("@kingjs/graph.tree.print")
      }
    },
    json: {
      file: {
        Read: require("@kingjs/json.file.read")
      }
    },
    module: {
      ExportExtension: require("@kingjs/module.export-extension")
    },
    package: {
      Find: require("@kingjs/package.find")
    }
  }
}