var {
  Path, 
  assert,
  ['@kingjs']: { 
    json: { file: { Read: ReadJsonFile } },
    fs: { promises: { Exists } },
    Path,
    module: { ExportExtension }, 
    array: { promises: { Map: AsyncMap } },
    stringEx: { ReplaceAll },
    package: {
      resolve: { NpmScope: ResolveNpmScope },
      name: { parse },
      source: {
        parse: {
          objectBindingPattern: { ToPackageNames },
          sourceFile: { GetDependencies }
        }
      }
    },
    source: { Parse: ParseSource }
  },
  npmPacklist,
  isBuiltinModule,
} = require('./dependencies')

var Period = '.'
var DotJs = '.js'
var PackageJson = 'package.json'
var NodeModules = 'node_modules'

/**
 * @description Harvest dependencies from js files.
 * 
 * @this Path The package dir.
 * 
 * @param [packageRelDir] The relative path from `npm-scope.json` to the `packageDir`.
 */
async function harvestDependencies(npmScopePath) {
  var packageDir = Path.cwd.to(this)
  var npmScopePath = npmScopePath || await packageDir[ResolveNpmScope]()
  var npmScopeDir = npmScopePath.dir
  packageRelDir = npmScopeDir.toRelative(packageDir)

  // discover path to external modules
  var { npmDir, name: thisScope } = await npmScopePath[ReadJsonFile]()

  // get .js files in package
  var files = [ ]
  if (await packageDir.to(PackageJson)[Exists]()) {
    var packList = await npmPacklist({ path: packageDir.toString() })
    files = packList.map(o => Path.parse(o))
  }
 
  // harvest file dependencies in parallel
  var fileDependencies = await files
    .filter(o => o.ext == DotJs)
    .map(o => packageDir.to(o))
    [AsyncMap](getFileDependencies)

  // remove duplicates
  var dependencies = [...new Set(fileDependencies.flat().sort())]

  var result = {
    dependencies: dependencies
      .filter(o => !isBuiltinModule(o))
      .reduce((a, o) => { 
        var { scope, name, fullName } = parse(o)
        assert(!scope || scope == thisScope, "Packages with external scopes NYI")

        var file = scope ?
          packageRelDir.toRelative(getPathFromFullName(fullName)) :
          packageRelDir.toRelative('.').to(npmDir).to(NodeModules).to(fullName)

        a[o] = `file:${file}` 
        return a 
      }, { }),
    
    nodeDependencies: dependencies
      .filter(o => isBuiltinModule(o))
  }

  return result
}

function getPathFromFullName(fullName) {
  return fullName[ReplaceAll](Period, Path.root)
}

async function getFileDependencies(path) {
  var ast = await path[ParseSource]()
  assert(ast)

  var objectBindingPattern = ast[GetDependencies]()
  if (!objectBindingPattern)
    return []

  return objectBindingPattern[ToPackageNames]()
}

module[ExportExtension](Path.Builder, harvestDependencies)