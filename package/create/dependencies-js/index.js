var { 
  fs, Path,
  '@kingjs': {
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
  var package = await read(packageJsonPath)
  if (!package)
    return

  // generate dependencies.js
  var dependencies = generateDependencies(package)

  // write dependencies.js
  var dependenciesJs = Path.join(packageDir, DependenciesJs)
  await fs.promises.writeFile(dependenciesJs, dependencies)
}

module.exports = createDependencies