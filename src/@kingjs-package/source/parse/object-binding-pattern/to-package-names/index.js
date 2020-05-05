var { 
  assert,
  isBuiltinModule,
  ['@kingjs']: { 
    module: { ExportExtension },
    camelCase: { split },
    package: { name: { construct } },
    reflect: { is },
    source: { types }
  },
} = require('./dependencies')

var { ObjectBindingPattern } = types

var At = '@'
var Underscore = '_'

function getPackageNames() {
  var packages = new Set()
  var stack = []
  walk(this)
  return [...packages.keys()]

  function walk(node) {
    for (var element of node.elements) {
      var { 
        propertyName: name = element.name, 
        name: value 
      } = element

      try {
        stack.push(split(name))

        if (stack.length == 1 && name[0] != At) {

          // eg. so builtin package childProcess -> child_process instead of child-process
          var packageName = construct(null, stack, Underscore)
          if (!isBuiltinModule(packageName))
            packageName = construct(null, stack)

          packages.add(packageName)
          continue
        }

        var isLeaf = !element.propertyName || is.string(element.name)
        if (isLeaf)
          packages.add(construct(stack[0][0].slice(1), stack.slice(1)))

        else
          walk(value)

      } finally {
        stack.pop()
      }
    }
  }
}

module[ExportExtension](ObjectBindingPattern, getPackageNames)