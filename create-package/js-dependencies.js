var { 
  assert, 
  path,
  isBuiltinModule,
  ['@kingjs']: { 
    camelCase: { split },
    packageName: { construct },
    reflect: { is }, 
    parseSource,
  },
} = require('./dependencies');

var KingJs = 'kingjs';
var AtKingJs = '@' + KingJs;
var Require = 'require';
var Dependencies = 'dependencies';
var Underscore = '_';

var {
  ObjectBindingPattern,
} = parseSource;

function parse(file) {
  var obp = matchDependencies(file);
  if (!obp)
    return [ ];

  // transform the ObjectBindingPattern into a literal
  var literal = evaluate(obp);

  // transform literal to package names
  var packages = getPackageNames(literal);

  return packages;
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

    // call is 'require'
    if (expression != Require)
      return;

    // argument like './.../dependencies.js'
    if (path.basename(argument) != Dependencies)
      return;

    return obp;
  } catch(e) { }
}

function getPackageNames(literal) {
  var packages = [];
  var stack = [];
  walk(literal);
  return packages;

  function walk(node) {
    for (var name in node) {
      var value = node[name];

      try {
        stack.push(split(name));

        if (stack.length == 1 && name != AtKingJs) {

          // eg. so builtin package childProcess -> child_process instead of child-process
          var packageName = construct(null, stack, Underscore)
          if (!isBuiltinModule(packageName))
            packageName = construct(null, stack)

          packages.push(packageName)
          continue
        }

        if (!value)
          packages.push(construct(KingJs, stack.slice(1)))

        else
          walk(value);

      } finally {
        stack.pop();
      }
    }
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
