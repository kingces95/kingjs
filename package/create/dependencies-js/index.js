var { 
  fs, Path, assert,
  '@kingjs': {
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
    [Map]((o, k) => {
      assert(FileRegex.test(o), `Dependency versions '${k}: ${o}' not a path.`)
      return read(Path.join(packageDir, FileRegex.exec(o)[1], PackageJson))
    })
    [AsyncMap](o =>
       o.capitalize)
    
  // generate dependencies.js
  var dependencies = generateDependencies(package, { capitalize })

  // write dependencies.js
  var dependenciesJs = Path.join(packageDir, DependenciesJs)
  await fs.promises.writeFile(dependenciesJs, dependencies)
}

module.exports = createDependencies