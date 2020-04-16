var {
  assert,
  ['@kingjs']: {
    module: { ExportExtension },
    path: { Builder: Path },
    fs: {
      promises: { 
        Exists,
        dir: { 
          Copy: CopyDir,
          Make: MakeDir
        }
      }
    },
    json: {
      file: {
        Update: UpdateJsonFile,
        Read: ReadJsonFile,
      }
    },
    package: {
      resolve: { NpmScope: ResolveNpmScope },
      harvest: {
        Dependencies: HarvestDependencies,
        Metadata: HarvestMetadata
      },
    },
  },
} = require('./dependencies')

var PackageJson = 'package.json'
var EmptyPackageJson = {
  name: '', version: '', description: '', main: ''
}

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
async function createPackage() {
  var packageDir = this
  var npmScopePath = await packageDir[ResolveNpmScope]()
  assert(npmScopePath, `Failed to find npm-scope.json starting from '${packageDir}'.`)
  var packageJsonPath = packageDir.to(PackageJson)
  var packageRelDir = npmScopePath.dir.toRelative(packageDir)

  // computing dependencies requires knowing the files
  var { 
    packageDefaults, 
    template 
  } = await npmScopePath[ReadJsonFile]()

  // make package directory
  if (!await packageDir[Exists]()) {
    packageDir[MakeDir]()

    // expand template
    var templatePath = npmScopePath.dir.to(template)
    if (template && await templatePath[Exists]())
      templatePath[CopyDir](packageDir)
  } 

  // set package default values
  await packageJsonPath[UpdateJsonFile]({
    ...EmptyPackageJson, // establish field order
    ...packageDefaults
  })

  // update/create metadata and dependencies
  package = { 
    ...await packageDir[HarvestMetadata](npmScopePath, packageRelDir),
    ...await packageDir[HarvestDependencies](packageRelDir)
  }
  await packageJsonPath[UpdateJsonFile](package)
}

module[ExportExtension](Path, createPackage)