var Path = require('path');
var fs = require('fs');

var { 
  ['@kingjs']: {
    git: { getDir }
  },
  shelljs 
} = require('./dependencies');

var cnj = require('./create-npm-json');

var DotDir = /(^|\/)\.\w/;
var Line = /\r?\n/;
var PackageJson = 'package.json';
var NpmJson = '.npm.json';

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
  var local = paths.map(function(path) { 
    var { name, version, dependencies } = JSON.parse(fs.readFileSync(path));
    return { path, name, version, dependencies };
  });

  // fetch remote package.json and save as .npm.json
  for (var x of local) {
    var { path } = x;

    var dir = Path.dirname(path);
    var npmJsonPath = Path.join(dir, NpmJson);
    if (fs.existsSync(npmJsonPath))
      continue;

    console.log(path);

    pushd(dir);
    cnj();
    popd();
  }

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