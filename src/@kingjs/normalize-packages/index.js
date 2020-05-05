var assert = require('assert');
var Path = require('path');
var fs = require('fs');

var { 
  ['@kingjs']: {
    git: { getDir },
    poset: { forEach }
  },
  shelljs 
} = module[require('@kingjs-module/dependencies')]();

var cnj = require('./create-npm-json');

var Force = false;
var DotDir = /(^|\/)\.\w/;
var Line = /\r?\n/;
var PackageJson = 'package.json';
var NpmJson = '.npm.json';
var EmptyObject = { };
var Scope = '@kingjs';

function createPoset(paths) {
  var local = {};
  var poset = {};
  for (var path of paths) {
    var { name, version, dependencies } = JSON.parse(fs.readFileSync(path));
    var x = { name, version, path, dependencies };
    
    // trap for duplicate names
    assert(x.name in poset == false);
    local[x.name] = x;
    poset[x.name] = Object.keys(x.dependencies || EmptyObject);
  }

  return { local, poset };
}

function packages() {
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
  var paths = files.filter(x => Path.basename(x) == PackageJson && !DotDir.test(x));

  // parse local package.json into { path, name, version, dependencies }
  var { local, poset } = createPoset(paths);

  // fetch remote package.json and save as .npm.json
  forEach.call(poset, function(vertex, stack) {
    if (vertex in local == false) {
      if (!vertex.startsWith(Scope))
        return;
      console.log(`Missing dependency: ${stack.join(' > ')}`);
      return;
    }

    var x = local[vertex];
    var { path } = x;

    var dir = Path.dirname(path);
    var npmJsonPath = Path.join(dir, NpmJson);
    if (Force || !fs.existsSync(npmJsonPath)) {
      console.log(`Generating .npm.json for: ${path}`);

      pushd(dir);
      cnj();
      popd();
      if (!fs.existsSync(npmJsonPath))
        return;
    }
    
    var { name, version, dependencies } = JSON.parse(fs.readFileSync(npmJsonPath));
    var y = { name, version, path, dependencies };
    try { assert.deepEqual(x, y); } catch(e) {
      console.log(e);
    }
  });

  return local;
}

var dirStack = [];
function pushd(dir) {
  var cwd = process.cwd();
  dirStack.push(cwd);
  process.chdir(dir);
}
function popd() {
  process.chdir(dirStack.pop());
}

module.exports = packages;

packages();