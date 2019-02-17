var { 
  ['@kingjs']: { 
    camelCase: { split },
    packageName: { construct },
    is, 
    parseSource,
  },
  assert, 
  path
} = require('./dependencies');

var EmptyObject = { };
var KingJs = 'kingjs';
var AtKingJs = '@' + KingJs;
var Require = 'require';
var Dependencies = 'dependencies';

var {
  ObjectBindingPattern,
} = parseSource;

function parse(file) {
  var obp = matchDependencies(file);

  // transform the ObjectBindingPattern into a literal
  var literal = evaluate(obp);

  // transform literal to package names
  var packages = getPackageNames(literal);

  return packages;
}

function getPackageNames(literal) {
  var packages = [];
  var stack = [];
  walk(literal);
  return packages;

  function walk(node) {
    for (var name in node) {
      var value = node[name];
      stack.push(split(name));

      if (!value) {
        if (stack[0][0] == AtKingJs)
          packages.push(construct(KingJs, stack.slice(1)));
        else
          packages.push(name)
      }
      else
        walk(value);

      stack.pop();
    }
  }
}

function matchDependencies(file) {
  try {

    // deconstruct the AST
    var {
      statements: {
        [0]: {
          declarationList: {
            [0]: {
              initializer: {
                expression,
                arguments: {
                  [0]: argument
                }
              },
              name: obp
            }
          }
        }
      }
    } = parseSource(file);

    // match the call is to 'require'
    if (expression != Require)
      return;

    // match the call argument is a path that ends in 'dependencies'
    if (path.basename(argument) != Dependencies)
      return;

    return obp;

  } catch(e) {
    return EmptyObject;
  }
}

function evaluate(obp) {
  assert(obp instanceof ObjectBindingPattern);
  var result = { };

  for (var element of obp.elements) {
    var name = element.propertyName;

    // leaf; { ['@kingjs']: { package } }
    if (!name) {
      name = element.name;
      result[name] = undefined;
      continue;
    }
  
    // ignore alias; { ['@kingjs']: { package: alias } }
    if (is.string(element.name)) {
      result[name] = undefined;
      continue;
    }

    // special; { ['rxjs/operators']: { groupBy, ... } }
    if (name.match(/\//)) {
      result[name] = undefined;
      continue;
    }

    // namespace; { ['@kingjs']: { ns: { ... } } }
    result[name] = evaluate(element.name);
  }

  return result;
}

module.exports = parse;

//console.log(JSON.stringify(parse('.test/sample.js'), null, 2));
