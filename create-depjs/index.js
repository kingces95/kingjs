#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var { 
  ['@kingjs']: {
    packageName: { parse },
    camelCase: { join }
  }
} = require('./dependencies');
var parse = require('@kingjs/package-name.parse');
var join = require('@kingjs/camel-case.join');

var EmptyString = '';
var Tab = '  ';
var At = '@';
var PackageJson = './package.json';
var DependenciesJs = './dependencies.js';

// join paths
var cwd = process.cwd();
var packageJsonPath = path.join(cwd, PackageJson);
var dependenciesJsPath = path.join(cwd, DependenciesJs);

// gather file segments to join into dependencies.js
var result = [ ];
var indent = [ ];
var newLine = true;
function write(value) {
  value = value || EmptyString;
  if (newLine) {
    newLine = false;
    result.push(indent.join(EmptyString));
  }
  result.push(value); 
}
function writeLine(value) { 
  value = value || EmptyString;
  write(value + '\n'); 
  newLine = true;
}

// extract dependencies from package.json
var { dependencies } = require(packageJsonPath);
dependencies = Object.keys(dependencies);

// group dependencies by scopes/namespaces
var tree = { };
for (var dependency of dependencies) {
  var node = tree;

  // split module name into its parts
  var ast = parse(dependency);

  // add scope
  var scope = ast.scope;
  if (scope) {
    scope = At + scope;
    
    if (!tree[scope])
      tree[scope] = { };
    node = tree[scope]
  }

  // add namespaces
  var parts = ast.parts;
  var lastIndex = parts.length - 1;
  for (var i = 0; i <= lastIndex; i++) {

    // join parts into a camel case name
    var name = join(parts[i]);

    if (!node[name])
      node[name] = i == lastIndex ? dependency : { };
    node = node[name];
  }
}

for (var name in tree) {
  var node = tree[name];

  if (typeof node == 'string') {
    write(`exports['${name}'] = require('${node}')`);
    writeLine();
    continue;
  }

  write(`exports['${name}'] = `);
  emitTree(node);

  // pop trailing comma
  result.pop(); // pop comma and return
  writeLine(); // push return
}
result.pop(); // pop trailing return

// write dependencies.js
fs.writeFileSync(dependenciesJsPath, result.join(EmptyString));

function emitTree(node) {
  indent.push(Tab);

  if (typeof node == 'string') {
    indent.pop();
    writeLine(`require('${node}'),`);
    return;
  }

  writeLine('{')
  for (var name in node) {
    write(`${name}: `);
    emitTree(node[name]);
  }
  indent.pop();
  write('}')
  writeLine(',')
}