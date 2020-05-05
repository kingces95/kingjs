var {
  ['@kingjs']: {
    Exception,
    module: { ExportExtension },
    graph: { Analyze }
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var EmptyArray = [ ]

class CycleException extends Exception {
  constructor(stack) {
    super(`Cycle detected: ${stack.join(' > ')}`, { stack })
  }
}

/** 
 * @description Reduces a poset dependent vertices first.
 * 
 * @this any The poset.
 * @param callback The reduction callback.
 * @param [initialValue] The initial reduction.
 * @param [options] Options for the reduction { roots, leafs }.
 * 
 * @return Returns the reduction.
 * 
 * @remarks - If a cycle is detected, then an exception is 
 * thrown listing the vertices involved in the cycle.
 * @remarks - `visitPerParent` will visit each node once for each
 * of its parents. The default is to visit each node once.
 */
function reduce(
  callback = o => o, 
  initialValue = [ ], 
  options = EmptyObject) {

  var poset = this
  var accumulator = initialValue
  var { roots, leafs, visitPerParent } = options

  if (leafs)
    leafs = new Set(leafs)

  if (!roots) {
    var analysis = poset[Analyze]()
    if (analysis.cycle)
      throw `Poset contains a cycle '${analysis.cycle}'.`
    roots = analysis.roots
  }

  var stack = []
  var onStack = new Set()
  var visited = new Map()

  for (var i = 0; i < roots.length; i++)
    visit(roots[i]) 

  return accumulator

  function visit(current, parent = null) {

    // test for cycles
    if (onStack.has(current))
      throw new CycleException(stack)

    var firstVisit = !visited.has(current)

    // process dependencies on first visit
    if (firstVisit) {

      // test for leaf
      var children = poset[current] || EmptyArray
      var foundLeaf = leafs ? leafs.has(current) : !children.length
      if (foundLeaf)
        children = EmptyArray
        
      // traverse adjacent vertices
      if (children.length) {
        stack.push(current)
        onStack.add(current)

        for (var i = 0; i < children.length; i++)
          foundLeaf = visit(children[i], current) || foundLeaf

        stack.pop()
        onStack.delete(current)
      }

      // log if this vertex depends on a leaf
      visited.set(current, foundLeaf)
    }

    var foundLeaf = visited.get(current)

    // process vertex (if it depends on a leaf)
    if (foundLeaf && (firstVisit || visitPerParent)) {
      var previousAccumulator = accumulator
      callback(accumulator, current, parent)
      if (accumulator === undefined)
        accumulator = previousAccumulator
    }

    return foundLeaf
  }
}

module[ExportExtension](Object, reduce)