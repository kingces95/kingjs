var {
  assert,
  '@kingjs': {
    module: { ExportExtension },
    Path,
    fs: {
      promises: { 
        Exists,
        dir: { 
          Copy: CopyDir,
          Make: MakeDir,
        },
        link: { Write: LinkTo }
      }
    },
    json: {
      file: {
        Update: UpdateJsonFile,
        Read: ReadJsonFile,
      }
    },
    package: {
      name: { parse: parseName },
      create: { DependenciesJs: CreateDependenciesJs },
      scope: { Probe: ResolveNpmScope },
      harvest: {
        Dependencies: HarvestDependencies,
        Metadata: HarvestMetadata
      },
    },
  },
} = module[require('@kingjs-module/dependencies')]()

var PackageJson = 'package.json'
var NodeModule = 'node_module'
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

  // computing dependencies requires knowing the files
  var {
    name: scope,
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
    ...await packageDir[HarvestMetadata](npmScopePath),
    ...await packageDir[HarvestDependencies](npmScopePath)
  }
  await packageJsonPath[UpdateJsonFile](package)

  // create dependencies.js
  await packageDir[CreateDependenciesJs]()

  // link package
  var nodeModulesScope = npmScopePath.dir.to(NodeModule).to(`@${scope}`)
  var { fullName } = parseName(package.name)
  await nodeModulesScope.to(fullName)[LinkTo](this)
}

module[ExportExtension](Path.Builder, createPackage)