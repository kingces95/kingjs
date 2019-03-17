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
  var gitDir = getDir();
  process.chdir(gitDir);

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
    .map(x => path.join(gitDir, path.dirname(x)));

  // reduce all non-kingjs dependencies into a single set
  var set = new Set();
  for (var packageDir of dirs) {
    var { dependencies = { } } = require(path.join(packageDir, PackageJson))
    for (var dependency of Object.keys(dependencies)) {
      var parts = parse(dependency);
      if (parts.scope == KingJs)
        continue;
      set.add(dependency)
    }
  }

  // install non-kingjs dependencies
  for (var dependency of set)
    exec(gitDir, `npm i ${dependency}`);

  // create links
  for (var toDir of dirs) {
    if (fs.existsSync(path.join(toDir, NodeModules)))
      continue;

    var jsonPath = require.resolve(PackageJson, { paths: [ toDir ] })
    var json = require(jsonPath)
    var { name } = json

    var fromDir = getModuleDir(gitDir, name)
    if (!fs.existsSync(fromDir)) {
      var scopeDir = path.dirname(fromDir)
      makeDir(scopeDir)
  
      console.log(`${fromDir} -> ${toDir}`)
      fs.symlinkSync(toDir, fromDir, 'dir')
    }
  }
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

function makeDir(dir) {
  if (fs.existsSync(dir))
    return;

  var { dir: subDir } = path.parse(dir);
  makeDir(subDir);
  fs.mkdirSync(dir);
}

function exec(dir, cmd) {
  console.log(`${dir}$ ${cmd}`);

  process.chdir(dir);
  var result = shelljs.exec(cmd, { silent:true });

  if (result.code != 0)
    throw result.stderr.trim();
}

module.exports = createLinks;