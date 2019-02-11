var assert = require('assert');
var path = require('path');

var { 
  ['@kingjs']: {
    git: { getDir },
    packageName: { parse }
  },
  shelljs
} = require('./dependencies');

var KingJs = 'kingjs';
var PackageJson = 'package.json';
var RootDir = getDir();

/**
 * @description Recursively creates npm links for all 
 * dependent packages.
 */
function createLinks() {
  var cwd = process.cwd();

  var paths = { [cwd]: null };
  var iterator = packagePaths(cwd);
  var next = iterator.next();
  while (!next.done) {
    var dir = next.value;
    if (dir in paths) {
      next = iterator.next(false);
      continue;
    }
    
    paths[dir] = null;
    next = iterator.next(true);
  }
}

function *packagePaths(dir) {
  exec(dir, `npm link`);

  var jsonPath = require.resolve(PackageJson, { paths: [ dir ] });
  var json = require(jsonPath);
  var { dependencies } = json;
  for (var dependency of Object.keys(dependencies)) {
    var dependencyDir = getPackageDir(dependency);
    if (!dependencyDir) {
      exec(dir, `npm i ${dependency}`);
      continue;
    }

    var recurse = yield dependencyDir;
    if (recurse)
      yield *packagePaths(dependencyDir);

    exec(dir, `npm link ${dependency}`);
  }
}

function getPackageDir(name) {
  var parts = parse(name);
  if (parts.scope != KingJs)
    return null;

  var dir = path.join(RootDir, ...parts.names);
  return dir;
}

function exec(dir, cmd) {
  process.chdir(dir);

  console.log(`${dir}$ ${cmd}`);
  var result = shelljs.exec(cmd, { silent:true });

  if (result.code != 0)
    throw result.stderr.trim();
}

module.exports = createLinks;