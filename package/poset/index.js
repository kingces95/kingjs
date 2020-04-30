var { 
  assert,
  '@kingjs': {
    Path,
    json: { file: { Read: ReadJsonFile } },
    array: { promises: { Map } },
    package: { Find },
    module: { ExportExtension }
  }
} = require('./dependencies')

var PackageJson = 'package.json'
var EmptyObject = { }

/**
 * @description Find packages and aggregate their dependencies into a pojo.
 * 
 * @this Path The path to start searching for packages
 * @returns Returns a pojo where each property is package name and each value
 * is an array containing the package's dependencies. 
 */
async function poset() {

  // find all packages as paths to `package.json`
  var packageDirs = await this[Find]()

  // load all `package.json` files in parallel
  var packages = await packageDirs
    [Map](async o => await o.to(PackageJson)[ReadJsonFile]())

  // reduce to an adjacency list where key = package-name, value = [ dependencies ]
  var result = packages.reduce((a, o) => {
    a[o.name] = Object.keys(o.dependencies || EmptyObject)
    return a
  }, { })

  return result
}

module[ExportExtension](Path.Builder, poset)