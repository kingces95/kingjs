var {
  Path,
  ['@kingjs']: { 
    json: {
      file: {
        update: updateJsonFile
      }
    },
    package: {
      findNpmScope,
      harvest: {
        dependencies: harvestDependencies,
        metadata: harvestMetadata
      },
    },
  },
} = require('./dependencies')

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
async function createPackage(packageDir) {
  var npmScopePath = await findNpmScope(packageDir)
  var packageRelDir = Path.relative(Path.dirname(npmScopePath), packageDir)
  var package = { 
    ...await harvestMetadata(packageDir, npmScopePath, packageRelDir),
    ...await harvestDependencies(packageDir, packageRelDir)
  }

  await updateJsonFile(Path.join(packageDir, PackageJson), package)
}

module.exports = createPackage