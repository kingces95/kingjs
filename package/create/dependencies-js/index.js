var { 
  fs, Path, assert,
  '@kingjs': {
    fs: {
      promises: {
        exists
      }
    },
    pojo: {
      Map,
      promises: { Map: AsyncMap }
    },
    json: {
      file: { read }
    },
    package: {
      source: {
        generate: {
          dependencies: generateDependencies
        }
      }
    }
  }
} = require('./dependencies')

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
async function createDependencies(packageDir) {

  // read package.json
  var packageJsonPath = Path.join(packageDir, PackageJson)
  var package = {
    dependencies: { },
    devDependencies: { },
    ...(await read(packageJsonPath) || { })
  }

  var capitalize =
    await package.dependencies
    [Map](async (o, k) => {
      if (!FileRegex.test(o))
        throw `Dependency '${k}: ${o}' version not of the form: 'file:...'.`

      var path = Path.join(packageDir, FileRegex.exec(o)[1], PackageJson)
      if (!await exists(path))
        throw `Dependency '${k}: ${o}' does not exists.`

      return await read(path)
    })
    [AsyncMap](o => o.capitalize)
    
  // generate dependencies.js
  var dependencies = generateDependencies(package, { capitalize })

  // write dependencies.js
  var dependenciesJs = Path.join(packageDir, DependenciesJs)
  await fs.promises.writeFile(dependenciesJs, dependencies)
}

module.exports = createDependencies