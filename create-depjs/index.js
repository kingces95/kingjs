var { 
  fs, 
  path
} = require('./dependencies');

var generate = require('./generate');
var PackageJson = './package.json';
var DependenciesJs = './dependencies.js';
var DevDependenciesJs = '.test/dependencies.js';

// extract dependencies from package.json
var cwd = process.cwd();

var packageJsonPath = path.join(cwd, PackageJson);
var { 
  dependencies, 
  devDependencies, 
  nodeDependencies = [] 
} = require(packageJsonPath);

if (fs.existsSync('.test')) {
  // write .test/dependencies.js
  var result = generate(Object.keys({ 
    ...dependencies, ...devDependencies 
  }).concat(nodeDependencies));

  var devDependenciesJsPath = path.join(cwd, DevDependenciesJs);
  if (result)
    fs.writeFileSync(devDependenciesJsPath, result);
}

// write ./dependencies.js
var result = generate(Object.keys({
  ...dependencies
}).concat(nodeDependencies));

var dependenciesJsPath = path.join(cwd, DependenciesJs);
if (result)
  fs.writeFileSync(dependenciesJsPath, result);