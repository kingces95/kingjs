var Path = require('path');
var fs = require('fs');

var { 
  shelljs 
} = module[require('@kingjs-module/dependencies')]();

var NpmJson = '.npm.json';
var PackageJson = 'package.json';

function createNpmJson() {
  var cwd = process.cwd();

  var { name } = JSON.parse(fs.readFileSync(Path.join(cwd, PackageJson)));
  var npmJsonPath = Path.join(cwd, NpmJson);

  var showExec = shelljs.exec(
    `npm show ${name} --json`, 
    { silent:true }
  );

  if (showExec.code) {
    console.log(showExec.stderr);
    return;
  }

  var npmJson = JSON.parse(showExec);
  fs.writeFileSync(npmJsonPath, JSON.stringify(npmJson, null, 2));
}

module.exports = createNpmJson;