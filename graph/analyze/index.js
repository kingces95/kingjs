var { 
  '@kingjs': {
    module: { ExportExtension },
  }
} = require('./dependencies')

var EmptyArray = []

/**
 * @description Test for roots, multipule parents, and cycles.
 * 
 * @this any The graph encoded a pojo where property name is a node,
 * and property value an array of children.
 * 
 * @returns Returns { roots, multiParents, cycle }; returns a list 
 * of roots, a cycle if one exists, nodes with multipule parents
 */
function analize() {

  var graph = this
  var stack = [ ]
  var parents = { }
  var onStack = new Set()
  var visited = { }
  var roots = new Set(Object.keys(this))
  var multiParented = null
  var cycle = null
  var height = 0

  for (var node in this) {
    if (roots.has(node))
      height = Math.max(height, walk(node))
  }

  function walk(current) {
    if (!cycle) {

      // cycle detected
      if (onStack.has(current)) {
        cycle = stack.slice(stack.indexOf(current))
        cycle.push(current)
        return
      }

      // prolog
      stack.push(current)
      onStack.add(current)
    }

    var childHeight = visited[current] || 0
    if (!childHeight) {

      for (var child of graph[current] || EmptyArray) {
        roots.delete(child)

        // found multi-parent
        if (child in parents) {

          // first multi-parent
          if (!multiParented)
            multiParented = { }

          // get parents
          var list = multiParented[child]
          if (!list)
            list = multiParented[child] = [ parents[child] ]

          // add multi-parent
          list.push(current)
        }

        // register parent for child
        parents[child] = current

        childHeight = Math.max(childHeight, walk(child))
      }
    
      visited[current] = childHeight + 1
    }

    // epilog
    if (!cycle) {
      onStack.delete(current)
      stack.pop()
    }

    return visited[current]
  }

  return { 
    roots: roots.size ? [ ...roots ] : null, 
    multiParented, 
    cycle,
    height: cycle ? undefined : height
  }
}

module[ExportExtension](Object, analize)