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
var Shim = '@kingjs/shim';
var PackageJson = 'package.json';
var RootDir = getDir();

/**
 * @description Recursively create symbolic links for all  
 * packages in a git enlistment at the root of the enlistment.
 */
function createLinks() {
  var cwd = process.cwd();

  var paths = { [cwd]: null };
  var iterator = packagePaths(cwd, true);
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

function *packagePaths(dir, dev) {
  //console.log(dir);
  exec(dir, `npm link`);

  var jsonPath = require.resolve(PackageJson, { paths: [ dir ] });
  var json = require(jsonPath);
  var { dependencies, devDependencies } = json;

  if (dev)
    dependencies = { ...dependencies, ...devDependencies }

  if (!dependencies)
    return;

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

  if (name == KingJs)
    return getPackageDir(Shim);

  if (parts.scope != KingJs && name != KingJs)
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