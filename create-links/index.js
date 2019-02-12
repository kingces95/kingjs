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

  for (var toDir of dirs) {
    var jsonPath = require.resolve(PackageJson, { paths: [ toDir ] });
    var json = require(jsonPath);
    var { name } = json;

    var parts = parse(name);
    var fullName = parts.fullName;
    var scope = EmptyString;
    if (parts.scope)
      scope = `@${parts.scope}`

    var fromDir = path.join(gitDir, NodeModules, scope);
    makeDir(fromDir);

    fromDir = path.join(fromDir, fullName);

    if (!fs.existsSync(fromDir)) {
      console.log(`${fromDir} -> ${toDir}`);
      fs.symlinkSync(toDir, fromDir, 'dir');
    }
  }
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