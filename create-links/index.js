var assert = require('assert');
var path = require('path');
var fs = require('fs');

var { 
  ['@kingjs']: {
    git: { getDir },
    packageName: { parse }
  },
  shelljs
} = require('./dependencies');

var DotNpm = '.npm';
var KingJs = 'kingjs';
var Shim = '@kingjs/shim';
var PackageJson = 'package.json';
var NodeModules = 'node_modules';
var RootDir = getDir();
var DotDir = /(^|\/)\.\w/;
var Line = /\r?\n/;
var EmptyString = '';

/**
 * @description Recursively creates npm links for all 
 * dependent packages.
 */
function createLinks() {

  var cwd = process.cwd();
  var localDirs = getLocalPackages().map(o => path.join(cwd, o));

  var gitDir = getDir();
  process.chdir(gitDir);
  cwd = process.cwd();

  var npmDirs = getNpmPackages(localDirs).map(o => path.join(cwd, o));
  var dirs = localDirs.concat(npmDirs);

  // create links
  for (var toDir of dirs) {

    if (fs.existsSync(path.join(toDir, NodeModules)))
      continue;
    
    var jsonPath = require.resolve(PackageJson, { paths: [ toDir ] })
    var json = require(jsonPath)
    var { name } = json

    var fromDir = getModuleDir(gitDir, name);
    if (!fs.existsSync(fromDir)) {
      var scopeDir = path.dirname(fromDir)

      if (!fs.existsSync(scopeDir))
        fs.mkdirSync(scopeDir, { recursive: true })
  
      fs.symlinkSync(toDir, fromDir, 'dir')
      console.log(`${fromDir} -> ${toDir}`)
    }
  }
}

function getLocalPackages() {

  // dump files
  var lsFiles = shelljs.exec(
    'git ls-files', 
    { silent:true }
  ).stdout.trim();

  // split dump into lines
  var files = lsFiles.split(Line);

  // select package.json in paths where no directory is prefixed with dot
  var dirs = files
    .filter(x => path.basename(x) == PackageJson && !DotDir.test(x))
    .map(x => path.dirname(x));

  return dirs;
}

function readJsonFile(path) {
  if (!fs.existsSync(path))
    return { };

  return JSON.parse(
    fs.readFileSync(path)
  )
}

function getNpmPackages(dirs) {
  
  // reduce all non-kingjs dependencies into a single set
  var set = new Set();
  for (var packageDir of dirs) {
    var { dependencies = { } } = readJsonFile(path.join(packageDir, PackageJson))
    for (var dependency of Object.keys(dependencies)) {
      var parts = parse(dependency);
      if (parts.scope == KingJs)
        continue;
      set.add(dependency)
    }
  }

  // create ~/.npm
  var npmDir = DotNpm;
  if (!fs.existsSync(npmDir))
    fs.mkdirSync(npmDir);

  // load ~/.npm/packages.json
  var npmPackagesJson = path.join(npmDir, PackageJson);
  var { dependencies = { } } = readJsonFile(npmPackagesJson)

  // bail if all dependencies loaded
  var npmPackages = path.join(npmDir, NodeModules);
  var packages = Object.keys(dependencies)
  if (!fs.existsSync(npmPackages) && packages.every(o => set.has(o))) {

    // refresh ~/.npm/packages.json
    for (var o of set)
      dependencies[o] = 'latest';
    fs.writeFileSync(npmPackagesJson, JSON.stringify({ dependencies }, null, 2));

    // install non-kingjs dependencies
    exec(npmDir, `npm i`);
  }

  return Array.from(set).map(o => path.join(npmPackages, o));
}

function getModuleDir(dir, name) {
  dir = path.join(dir, NodeModules)

  var parts = parse(name)
  var fullName = parts.fullName

  if (parts.scope)
    dir = path.join(dir, `@${parts.scope}`)

  dir = path.join(dir, fullName)
  return dir;
}

function exec(dir, cmd) {
  console.log(`${dir}$ ${cmd}`);

  process.chdir(dir);
  var result = shelljs.exec(cmd, { silent:true });

  if (result.code != 0)
    throw result.stderr.trim();
}

module.exports = createLinks;