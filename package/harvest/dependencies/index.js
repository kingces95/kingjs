var {
  Path, assert,
  ['@kingjs']: { 
    fs: { promises: { Exists } },
    path: { Builder: Path },
    module: { ExportExtension }, 
    array: { promises: { Map: AsyncMap } },
    stringEx: { ReplaceAll },
    package: {
      resolve: { NpmScope: ResolveNpmScope },
      name: { parse },
      source: {
        objectBindingPattern: { ToPackageNames },
        sourceFile: { GetDependencies }
      }
    },
    source: { parse: ParseSource }
  },
  npmPacklist,
  isBuiltinModule,
} = require('./dependencies')

var Period = '.'
var DotJs = '.js'
var PackageJson = 'package.json'

/**
 * @description Harvest dependencies from js files.
 * 
 * @this Path The package dir.
 * 
 * @param [packageRelDir] The relative path from `npm-scope.json` to the `packageDir`.
 */
async function harvestDependencies(packageRelDir) {
  var packageDir = Path.Cwd.to(this)

  if (!packageRelDir) {
    var npmScopePath = npmScopePath || await packageDir[ResolveNpmScope]()
    packageRelDir = npmScopePath.dir.toRelative(packageDir)
  }

  // get .js files in package
  var files = [ ]
  if (await packageDir.to(PackageJson)[Exists]()) {
    var packList = await npmPacklist({ path: packageDir.toString() })
    files = packList.map(o => Path.create(o))
  }
 
  // harvest file dependencies in parallel
  var fileDependencies = await files
    .filter(o => o.ext == DotJs)
    .map(o => packageDir.to(o))
    .map(getFileDependencies)
    [AsyncMap]()

  // remove duplicates
  var dependencies = [...new Set(fileDependencies.flat().sort())]

  var result = {
    dependencies: dependencies
      .filter(o => !isBuiltinModule(o))
      .reduce((a, o) => { 
        var { fullName } = parse(o)
        var file = packageRelDir.toRelative(getPathFromFullName(fullName))
        a[o] = `file:${file}` 
        return a 
      }, { }),
    
    nodeDependencies: dependencies
      .filter(o => isBuiltinModule(o))
  }

  return result
}

function getPathFromFullName(fullName) {
  return fullName[ReplaceAll](Period, Path.sep)
}

async function getFileDependencies(path) {
  var ast = await path[ParseSource]()
  assert(ast)

  var objectBindingPattern = ast[GetDependencies]()
  if (!objectBindingPattern)
    return []

  return objectBindingPattern[ToPackageNames]()
}

module[ExportExtension](Path, harvestDependencies)