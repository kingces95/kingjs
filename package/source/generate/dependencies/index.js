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

function generateCalls(leafs, depth = 0) {
  return leafs.map(o => new PropertyAssignment(
    camelCaseJoin(o.parts[depth]),
    new Call(Require, [new String(o.name)])
  ))
}

function generateProperty(name, packages, depth = 0) {
  var {
    [true]: leafs = [], 
    [false]: namespaces = []
  } = packages[Partition](o => o.names.length - 1 == depth)

  return new PropertyAssignment(name,
    new ObjectLiteral(
      ...generateCalls(leafs, depth), 
      ...namespaces[GroupBy](o => camelCaseJoin(o.parts[depth]))
        .map(o => generateProperty(o.key, o.group, depth + 1
      ))
    )
  )
}

function generateDependencies(project) {
  var { 
    dependencies = { }, 
    nodeDependencies = [ ] 
  } = project

  var parses = Reflect.ownKeys(dependencies).map(o => parse(o))
  var scopes = parses[GroupBy](o => o.scope)

  return new Assignment(
    new PropertyAccess(Module, Exports),
    new ObjectLiteral(
      ...generateCalls(nodeDependencies.map(o => parse(o, Underline))),
      ...scopes.map(o => generateProperty(new String(construct(o.key)), o.group))
    )
  ).toString()
}

module.exports = generateDependencies