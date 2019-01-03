'use strict';

var DefaultPath = './package.json';

function requirePackages(path) {
  if (!path)
    path = DefaultPath;

  var json = this.require(path);

  for (var name in json) {
    if (name == 'dependencies')
      continue;
    delete json[name];
  }

  var { dependencies } = json;
  
  var packages = { };
  for (var dependency in dependencies)
    packages[dependency] = this.require(dependency);

  return packages;
}

module.exports = requirePackages;