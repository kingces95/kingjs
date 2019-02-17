var { 
  ['@kingjs']: { 
    is, parseSource,
  } 
} = require('./dependencies');

var assert = require('assert');
var path = require('path');

var Require = 'require';
var Dependencies = 'dependencies';

var {
  ObjectBindingPattern,
} = parseSource;

function parse(file) {
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

    // transform the ObjectBindingPattern into a literal
    var literal = evaluate(obp);

    return walk(root);

  } catch(e) { 
    console.log(e);
  }
}

function getPackageNames(literal) {
  
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

console.log(JSON.stringify(parse('.test/sample.js'), null, 2));
