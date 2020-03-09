var { 
  ['@kingjs']: {
    packageName: { parse },
    camelCase: { join }
  },
  isBuiltinModule
} = require('./dependencies');

var path = require('path');
var fs = require('fs');

var EmptyString = '';
var Tab = '  ';
var At = '@';

function generate(dependencies) {

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

  // group dependencies by scopes/namespaces
  var tree = { };
  for (var dependency of dependencies) {
    var node = tree;

    // split module name into its parts
    var ast = parse(dependency, isBuiltinModule(dependency) ? '_' : '-');

    // add scope
    var scope = ast.scope;
    if (scope) {
      scope = At + scope;
      
      // activate node to host scope
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

      if (!node[name]) {
        if (i == lastIndex) {
            // test for 'capitalize=true' in package.json
            var { capitalize } = isBuiltinModule(dependency) ? 
              false : getPackageJson(dependency);
              
            if (capitalize)
              name = name[0].toUpperCase() + name.substr(1);

          node[name] = dependency;
        } 
        else 
          node[name] = { };
      }
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

  return result.join(EmptyString);
}

function getPackageJson(dependency) {
  var cwd = process.cwd();
  var index = require.resolve(dependency, { paths: [ cwd ] });
  var dir = path.dirname(index);
  var packageJson = path.join(dir, 'package.json');
  if (!fs.existsSync(packageJson))
    return { };

  var json = require(packageJson);
  return json;
}

module.exports = generate;