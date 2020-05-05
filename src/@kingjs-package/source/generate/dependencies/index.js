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

function generateCalls(leafs, options, depth = 0) {
  return leafs.map(o => {
    var name = camelCaseJoin(o.parts[depth])
    if (options.capitalize[o.fqn])
      name = name[0].toUpperCase() + name.substring(1)

    return new PropertyAssignment(
      name, new Call(Require, [new String(o.fqn)])
    )
  })
}

function generateProperty(name, packages, options, depth = 0) {
  var {
    [true]: leafs = [], 
    [false]: namespaces = []
  } = packages[Partition](o => o.segments.length - 1 == depth)

  return new PropertyAssignment(name,
    new ObjectLiteral(
      ...generateCalls(leafs, options, depth), 
      ...namespaces[GroupBy](o => camelCaseJoin(o.parts[depth]))
        .map(o => generateProperty(o.key, o.group, options, depth + 1))
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
  var externalDependencies = parses.filter(o => !o.scope)
  var localDependencies = parses.filter(o => o.scope)[GroupBy](o => o.scope)

  return new Assignment(
    new PropertyAccess(Module, Exports),
    new ObjectLiteral(
      ...generateCalls(nodeDependencies.map(o => parse(o, Underline)), options),
      ...generateCalls(externalDependencies.map(o => o), options),
      ...localDependencies.map(o => generateProperty(new String(construct(o.key)), o.group, options))
    )
  ).toString()
}

module.exports = generateDependencies