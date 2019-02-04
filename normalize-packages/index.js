var Path = require('path');
var fs = require('fs');

var { 
  ['@kingjs']: {
    git: { getDir }
  },
  shelljs 
} = require('./dependencies');

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

  // fetch remote package.json into { path, name, version, dependencies }
  for (var x of local) {
    var { name, path } = x;

    var npmJsonPath = Path.join(Path.dirname(path), NpmJson);
    if (fs.existsSync(npmJsonPath))
      continue;

    console.log(path);

    var showExec = shelljs.exec(
      `npm show ${name} --json`, 
      { silent:true }
    );

    if (showExec.code) {
      console.log(showExec.stderr);
      continue;
    }

    var npmJson = JSON.parse(showExec);
    fs.writeFileSync(npmJsonPath, JSON.stringify(npmJson, null, 2));
  }

  return local;
}

module.exports = packages;

packages();