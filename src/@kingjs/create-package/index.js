var {
  fs, path,
  '@kingjs': { 
    git: { getDir },
    stringEx: { ReplaceAll },
    package: {
      name: { parse, construct },
    },
    parseSource
  },
  npmPacklist,
  isBuiltinModule,
} = module[require('@kingjs-module/dependencies')]()

var getJsdocDescription = require('./jsdoc-description')
var getJsDependencies = require('./js-dependencies')

var Period = '.'
var ForwardSlash = '/'
var DotJs = '.js'
var Git = 'git'
var KingJs = 'kingjs'
var AtKingJs = '@' + KingJs
var PackageName = 'package.json'
var RepositoryUrl = 'https://repository.kingjs.net/'

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
function createPackage() {
  var cwd = process.cwd()

  var targetPath = joinPath(cwd, PackageName)

  // load existing package.json, or template package.json
  var packagePath = targetPath
  if (!fs.existsSync(packagePath))
    packagePath = require.resolve('./package.t.json')
  var pkg = require(packagePath)
  var { main } = pkg

  // harvest description from main.js file
  var mainPath = joinPath(cwd, main)  
  if (fs.existsSync(mainPath)) {
    var ast = parseSource(mainPath)
    var description = getJsdocDescription(ast)
    if (description)
      pkg.description = description
  }

  // harvest package name from path relative to git enlistment
  var gitDir = getDir()
  var relPath = path.relative(gitDir, cwd)

  // update package name
  var packageName = `@${KingJs}/${relPath[ReplaceAll](path.sep, Period)}`
  pkg.name = packageName

  // update package repository
  var repository = `${RepositoryUrl}${relPath[ReplaceAll](path.sep, ForwardSlash)}`
  if (!pkg.repository)
    pkg.repository = { }
  pkg.repository.type = Git
  pkg.repository.url = repository

  // get .js files in package
  var files = npmPacklist.sync()
  var jsFiles = files.filter(o => path.extname(o) == DotJs)
  var arraysOfDependencies = jsFiles.map(o => getJsDependencies(parseSource(o)))
  var allDependencies = [...new Set(
    arraysOfDependencies
      .reduce((a, o) => { a.push(...o); return a }, [ ])
  )].sort()

  // add non-built-in dependencies
  pkg.dependencies = allDependencies
    .filter(o => !isBuiltinModule(o))
    .map(o => trimDependencies(o, gitDir))
    .reduce((a, o) => { a[o] = 'latest'; return a }, { })

  // add node dependencies
  var nodeDependencies = allDependencies
    .filter(o => isBuiltinModule(o))
  if (nodeDependencies.length)
    pkg.nodeDependencies = nodeDependencies

  fs.writeFileSync(targetPath, JSON.stringify(pkg, null, 2))
}

function trimDependencies(dependency, dir) {
  var { scope, segments } = parse(dependency)

  if (!scope || scope != KingJs)
    return dependency

  var options = { paths: [ dir ] }
  while (segments.length) {
    var result = construct(scope, segments)
    try { 
      require.resolve(result, options)
      return result
    } catch(e) { }
    segments.pop()
  }

  throw 'Failed to resolve: ' + dependency
}

function joinPath(basePath, relPath) {
  if (path.isAbsolute(relPath))
    return relPath
  return path.join(basePath, relPath)
}

module.exports = createPackage