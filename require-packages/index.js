var parse = require('@kingjs/package-name.parse');
var join = require('@kingjs/camel-case.join');

var At = '@';
var PackageJson = './package.json';

/**
 * @this module The module of the package doing the requiring.
 * @returns Module names mapped to exports and an tree representing module names terminating in exports.
 */
function requirePackages() {
  var json = this.require(PackageJson);

  for (var name in json) {
    if (name == 'dependencies')
      continue;
    delete json[name];
  }

  var { dependencies } = json;
  
  var result = { };
  for (var dependency in dependencies) {
    var exports = this.require(dependency);
    result[dependency] = exports;
    addPackage.call(result, parse(dependency), exports);
  }

  return result;
}

function addPackage(ast, exports) {
  var current = this;
  var scope = ast.scope;

  if (scope) {
    scope = At + scope;
    
    if (!this[scope])
      this[scope] = { };
    current = this[scope]
  }

  addFullName.call(current, ast, exports);
}

function addFullName(ast, exports) {
  var current = this;

  var parts = ast.parts;
  var lastIndex = parts.length - 1;
  for (var i = 0; i <= lastIndex; i++) {
    var name = join(parts[i]);
    if (!current[name])
      current[name] = i == lastIndex ? exports : { };
    current = current[name];
  }
}

module.exports = requirePackages;