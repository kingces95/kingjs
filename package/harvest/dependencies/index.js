var {
  Path, assert,
  ['@kingjs']: { 
    fs: { promises: { exists} },
    array: { promises: { AsyncMap } },
    stringEx: { ReplaceAll },
    package: {
      findNpmScope,
      name: { 
        parse, 
      },
      source: {
        objectBindingPattern: { 
          ToPackageNames 
        },
        sourceFile: {
          GetDependencies,
        }
      }
    },
    source: {
      parse: parseSource,
    }
  },
  npmPacklist,
  isBuiltinModule,
} = require('./dependencies')

var Period = '.'
var DotJs = '.js'
var PackageJson = 'package.json'

/**
 * @description Creates or updates fields of `package.json`
 * that can be inferred from the surrounding environment.
 * 
 * @remarks The following are harvested from environment:
 * @remarks - `description`: The first JsDoc `description` found in the `main` js file.
 * @remarks - `name`: A join with period of the relative path of this package in the repository.
 * @remarks - `repository.url`: `https://repository.kingjs.net/` plus a
 * join with forward slash of the relative paths in the repository.
 */
async function harvestDependencies(packageDir, packageRelDir) {
  if (!packageRelDir) {
    var npmScopePath = npmScopePath || await findNpmScope(packageDir)
    packageRelDir = Path.relative(Path.dirname(npmScopePath), packageDir)
  }

  // get .js files in package
  var files = [ ]
  if (await exists(Path.join(packageDir, PackageJson)))
    files = await npmPacklist({ path: packageDir })
 
  // harvest file dependencies in parallel
  var fileDependencies = await files
    .filter(o => Path.extname(o) == DotJs)
    .map(o => Path.join(packageDir, o))
    .map(getFileDependencies)
    [AsyncMap]()

  // remove duplicates
  var dependencies = [...new Set(fileDependencies.flat().sort())]

  var result = {
    dependencies: dependencies
      .filter(o => !isBuiltinModule(o))
      .reduce((a, o) => { 
        var { fullName } = parse(o)
        var file = Path.relative(packageRelDir, getPathFromFullName(fullName))
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
  var ast = await parseSource(path)
  assert(ast)

  var objectBindingPattern = ast[GetDependencies]()
  if (!objectBindingPattern)
    return []

  return objectBindingPattern[ToPackageNames]()
}

module.exports = harvestDependencies