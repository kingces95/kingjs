var { 
  Path, fs
} = require('./dependencies')

var PackageJson = 'package.json'

/**
 * @description Resolve `package.json` for a package.
 * 
 * @param package The package to resolve.
 * @param [dir] The directory to begin the search for the package. 
 * Default is current working directory.
 * 
 * @returns Returns the path to `package.json` for the resolved package
 * or null if the package failed to resolve.
 */
function resolvePackage(package, dir = process.cwd()) {
  var main = require.resolve(package, { paths: [ dir ] })
  var packageJsonPath = Path.join(Path.dirname(main), PackageJson)
  if (!fs.existsSync(packageJsonPath))
    return null

  return Path.relative(process.cwd(), packageJsonPath)
}

module.exports = resolvePackage