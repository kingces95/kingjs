var {
  assert, Path,
  ['@kingjs']: {
    fs: {
      promises: { exists }
    },
    json: {
      file: {
        update: updateJsonFile,
        read: readJsonFile,
        write: writeJsonFile
      }
    },
    package: {
      resolve: {
        npmScope: resolveNpmScope
      },
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
  var npmScopePath = await resolveNpmScope(packageDir)
  assert(npmScopePath, `Failed to find npm-scope.json starting from '${packageDir}'.`)

  // computing dependencies requires knowing the files
  var { files } = await readJsonFile(npmScopePath)

  // expand template if 
  if (!await exists(packageDir)) {
    
  }

  // set package default values
  var packageJsonPath = Path.join(packageDir, PackageJson)
  var package = await readJsonFile(packageJsonPath)
  if (!package.files)
    package.files = files
  await writeJsonFile(packageJsonPath, package)

  // update/create metadata and dependencies
  var packageRelDir = Path.relative(Path.dirname(npmScopePath), packageDir)
  package = { 
    ...await harvestMetadata(packageDir, npmScopePath, packageRelDir),
    ...await harvestDependencies(packageDir, packageRelDir)
  }
  await updateJsonFile(packageJsonPath, package)
}

module.exports = createPackage