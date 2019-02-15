#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var generate = require('./generate');

var PackageJson = './package.json';
var DependenciesJs = './dependencies.js';
var DevDependenciesJs = '.test/dependencies.js';

//process.chdir('../create-package')

// extract dependencies from package.json
var cwd = process.cwd();
var packageJsonPath = path.join(cwd, PackageJson);
var { dependencies, devDependencies } = require(packageJsonPath);

if (fs.existsSync('.test')) {
  // write .test/dependencies.js
  var result = generate(Object.keys({ ...dependencies, ...devDependencies }));
  var devDependenciesJsPath = path.join(cwd, DevDependenciesJs);
  if (result)
    fs.writeFileSync(devDependenciesJsPath, result);
}

// write ./dependencies.js
var result = generate(Object.keys(dependencies));
var dependenciesJsPath = path.join(cwd, DependenciesJs);
if (result)
  fs.writeFileSync(dependenciesJsPath, result);