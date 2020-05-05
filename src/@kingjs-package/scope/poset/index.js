var { 
  assert,
  '@kingjs': {
    Path,
    json: { file: { Read: ReadJsonFile } },
    array: { promises: { Map } },
    graph: { 
      poset: { ToTree, Add, Reverse }, 
      tree: { Print } 
    },
    package: { 
      Find,
      scope: { Probe: ResolveNpmScope } 
    },
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
  // var packageJson = await this.to(PackageJson)[ReadJsonFile]()
  // var { name } = packageJson

  // find scope
  var scopePath = await this[ResolveNpmScope]()

  // find all packages
  var packageDirs = await scopePath.dir[Find]()

  // load all packages parallel
  var packages = await packageDirs
    [Map](async o => await o.to(PackageJson)[ReadJsonFile]())

  // reduce to an adjacency list where key = package-name, value = [ dependencies ]
  var poset = packages.reduce((a, o) => {
    a[o.name] = Object.keys(o.dependencies || EmptyObject)
    return a
  }, { })

  return poset

  // var rPoset = poset[Reverse]()

  // var dependencies = poset[ToTree]([name])
  // dependencies[Print]({ postOrder: name })

  // var dependents = rPoset[ToTree]([name])
  // dependents[Print]({ preOrder: name })

  // var tree = dependencies[Add](dependents)
  // tree[Print]({
  //   inOrder: name,
  //   postOrder: '@kingjs/path-builder',
  //   preOrder: new Set(tree[name])
  // })
}

module[ExportExtension](Path.Builder, poset)