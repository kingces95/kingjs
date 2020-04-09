var {
  ['@kingjs']: { 
    array: {
      GroupBy,
      Partition
    },
    source: { generate },
    camelCase: { join: camelCaseJoin },
    package: { 
      name: {
        parse,
        construct
      }
    }
  }
} = require('./dependencies')

var {
  Assignment,
  ObjectLiteral,
  Call,
  PropertyAssignment,
  PropertyAccess
} = generate

var Require = 'require'
var Exports = 'exports'
var Module = 'module'
var Underline = '_'
var DefaultOptions = { capitalize: { } }
var CapitalizeBuiltInPackage = { path: true }

function generateCalls(leafs, depth, options) {
  return leafs.map(o => {
    var name = camelCaseJoin(o.parts[depth])
    if (options.capitalize[o.fqn])
      name = name[0].toUpperCase() + name.substring(1)

    return new PropertyAssignment(
      name, new Call(Require, [new String(o.fqn)])
    )
  })
}

function generateProperty(name, packages, depth, options) {
  var {
    [true]: leafs = [], 
    [false]: namespaces = []
  } = packages[Partition](o => o.segments.length - 1 == depth)

  return new PropertyAssignment(name,
    new ObjectLiteral(
      ...generateCalls(leafs, depth, options), 
      ...namespaces[GroupBy](o => camelCaseJoin(o.parts[depth]))
        .map(o => generateProperty(o.key, o.group, depth + 1, options))
    )
  )
}

function generateDependencies(project, options = DefaultOptions) {
  var { 
    dependencies = { }, 
    nodeDependencies = [ ] 
  } = project

  options.capitalize = {
    ...CapitalizeBuiltInPackage,
    ...options.capitalize
  }

  var parses = Reflect.ownKeys(dependencies).map(o => parse(o))
  var scopes = parses[GroupBy](o => o.scope)

  return new Assignment(
    new PropertyAccess(Module, Exports),
    new ObjectLiteral(
      ...generateCalls(nodeDependencies.map(o => parse(o, Underline)), 0, options),
      ...scopes.map(o => generateProperty(new String(construct(o.key)), o.group, 0, options))
    )
  ).toString()
}

module.exports = generateDependencies