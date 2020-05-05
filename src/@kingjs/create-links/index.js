const assert = require('assert')
const fs = require('fs')
const Path = require('path')
const Process = require('process')
const ChildProcess = require('child_process')

const run = require('@kingjs/run')
const mklink = require('@kingjs/make-link')
const parse = require('@kingjs/package-name.parse')
const construct = require('@kingjs/package-name.construct')

const Period = '.'
const NodeModules = 'node_modules'
const PackageJson = 'package.json'
const DotExternal = '.npm'
const Latest = 'latest'
const Slash = '/'
const UTF8 = 'utf8'

function pathExists(path) {
  return new Promise(resolve => fs.exists(path, o => resolve(o)))
}

function orderKeys(source) {
  var target = { }
  for (var key of Object.keys(source).sort())
    target[key] = source[key]
  return target
}

function stringify(object) {
  return JSON.stringify(object, null, 2)
}

var root = Process.cwd()

async function* makeLink(toDir, fromDir) {
  await mklink(toDir, fromDir)
  console.log(`${fromDir} -> ${toDir}`)
}

async function* findPackages(action, path = Period) {
  assert(path)

  // enumerate the directory entries
  const dir = await fs.promises.readdir(path, { withFileTypes: true })

  for (const dirent of dir) {
    const { name } = dirent

    // process any discovered packages
    if (name == PackageJson) {
      yield action(path)
      continue
    }

    // skip non-directories
    if (!dirent.isDirectory())
      continue

    // skip node_modules directory and directories whose name starts with period
    if (name[0] == Period || name == NodeModules)
      continue

    // scan the sub-directory in parallel
    yield findPackages(action, Path.join(path, name))
  }
}

async function createLinks() {

  // find root of git enlistment
  while (!await pathExists('.git')) {
    if (root == Slash)
      throw 'Failed to find root of git enlistment.'
    Process.chdir('..')
    root = Process.cwd()
  }

  // build known paths
  const externalDir = Path.join(root, DotExternal)
  const packageJsonPath = Path.join(externalDir, PackageJson)
  
  // scan root sub-directories in parallel for packages
  // link from root node_modules to each package and
  // gather external dependencies
  const externalDependencies = { }
  await run(findPackages(scanPackage))

  // mkdir .npm
  await fs.promises.mkdir(externalDir, { recursive: true })

  // generate package.json
  var packageJson = stringify({ 
    description: 'External dependencies of this repository.',
    repository: 'n/a',
    license: 'MIT',
    dependencies: orderKeys(externalDependencies) 
  })

  // diff existing .npm/packages.json with new package.json
  if (await pathExists(packageJsonPath)) {
    var existingPackageJson = await fs.promises.readFile(packageJsonPath, UTF8)
    if (existingPackageJson.trim() == packageJson.trim())
      return
  } 
  else if (Object.keys(externalDependencies).length == 0)
    return

  // create or update .npm/packages.json
  await fs.promises.writeFile(packageJsonPath, packageJson)

  // .npm/packages.json$ npm i, log any errors
  console.log('~/.npm$ npm i')
  var npm = ChildProcess.spawn('npm', ['i'], { cwd: externalDir })
  npm.stderr.setEncoding(UTF8)
  npm.stderr.on('data', o => Process.stderr.write(o))

  async function* scanPackage(path) {
    assert(path)
  
    // parse package.json
    var jsonPath = require.resolve(PackageJson, { paths: [ path ] })
    var json = JSON.parse(await fs.promises.readFile(jsonPath))
    var { name, dependencies } = json
    var { scope } = parse(name)
  
    // install module in root node_modules
    yield makeLink(path, Path.join(NodeModules, name))
  
    // scan for new external dependencies, record and link them
    for (dependency in dependencies) {
  
      var { scope: dependencyScope } = parse(dependency)
      if (dependencyScope == scope)
        continue
  
      if (dependencies[dependency] != Latest)
        console.warn(`Expected package '${path}' dependency '${dependency}' to be '${Latest}'`)
  
      // skip previously found external dependencies
      if (dependency in externalDependencies)
        continue
  
      // record external module
      externalDependencies[dependency] = Latest
  
      // install external module in root node_modules
      yield makeLink(Path.join(DotExternal, NodeModules, dependency), Path.join(NodeModules, dependency))
    }
  }  
}

module.exports = createLinks