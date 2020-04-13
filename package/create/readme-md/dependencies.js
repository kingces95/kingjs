module.exports = {
  fs: require("fs"),
  Path: require("path"),
  "@kingjs": {
    package: {
      name: {
        parse: require("@kingjs/package.name.parse")
      },
      source: {
        parse: {
          sourceFile: {
            GetFirstDocumented: require("@kingjs/package.source.parse.source-file.get-first-documented")
          }
        }
      }
    },
    source: {
      GetInfo: require("@kingjs/source.get-info"),
      parse: require("@kingjs/source.parse")
    },
    stringEx: {
      Expand: require("@kingjs/string-ex.expand")
    }
  }
}