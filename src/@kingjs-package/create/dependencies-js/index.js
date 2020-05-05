var { 
  fs, assert,
  '@kingjs': {
    module: { ExportExtension },
    Path,
    fs: {
      promises: {
        Exists,
        file: { Write: WriteFile }
      }
    },
    pojo: {
      Map,
      promises: { Map: AsyncMap }
    },
    json: { file: { Read: ReadJsonFile } },
    package: {
      source: {
        generate: {
          dependencies: generateDependencies
        }
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var PackageJson = 'package.json'
var DependenciesJs = 'dependencies.js'
var EmptyArray = []
var FileRegex = /file:(.*)/

/**
 * @description The description.
 * 
 * @param packageDir The directory containing the `package.json` from
 * which to harvest dependencies to generate `dependencies.js`.
 * 
 * @remarks Does nothing if `package.json` is not found.
 */
async function createDependencies() {
  var packageDir = this

  // read package.json
  var packageJsonPath = packageDir.to(PackageJson)
  var package = {
    dependencies: { },
    devDependencies: { },
    ...(await packageJsonPath[ReadJsonFile]() || { })
  }

  // harvest `{ capitalize }` from dependent package.json in parallel 
  var capitalize = await (package.dependencies
    [Map](async (o, k) => {
      if (!FileRegex.test(o))
        throw `Dependency '${k}: ${o}' version not of the form: 'file:...'.`

      var dependencyPath = Path.parse(FileRegex.exec(o)[1])
      var dependentPackageJsonPath = packageDir
        .to(dependencyPath)
        .to(PackageJson)

      if (!await dependentPackageJsonPath[Exists]())
        throw `Package '${packageJsonPath}' depends on '${dependentPackageJsonPath}' which does not exists.`

      return await dependentPackageJsonPath[ReadJsonFile]()
    })
    [AsyncMap](o => o.capitalize))
    
  // codeGen; generate dependencies.js
  var dependencies = generateDependencies(package, { capitalize })

  // write dependencies.js
  var dependenciesJs = packageDir.to(DependenciesJs)
  await dependenciesJs[WriteFile](dependencies)
}

module[ExportExtension](Path.Builder, createDependencies)