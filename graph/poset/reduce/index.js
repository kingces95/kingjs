var {
  ['@kingjs']: {
    Exception,
    module: { ExportExtension }
  }
} = require('./dependencies')

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
 */
function reduce(
  callback = o => o, 
  initialValue = [ ], 
  options = EmptyObject) {

  var poset = this
  var accumulator = initialValue
  var { roots, leafs } = options

  if (leafs)
    leafs = new Set(leafs)

  if (!roots)
    roots = Object.keys(poset)

  var stack = []
  var onStack = new Set()
  var visited = new Map()

  for (var i = 0; i < roots.length; i++)
    visit.call(poset, roots[i]) 

  return accumulator

  function visit(current) {

    // test for cycles
    if (onStack.has(current))
      throw new CycleException(stack)

    // test for leaf
    var children = this[current] || EmptyArray
    var foundLeaf = leafs ? leafs.has(current) : !children.length
    if (foundLeaf)
      children = EmptyArray
  
    // bail if dependency already processed
    if (!visited.has(current)) {

      // prolog
      stack.push(current)
      onStack.add(current)

      // traverse adjacent vertices
      for (var i = 0; i < children.length; i++)
        foundLeaf = visit.call(this, children[i]) || foundLeaf

      // epilog
      stack.pop()
      onStack.delete(current)
      
      // process vertex (if it depends on a leaf)
      if (foundLeaf) {
        var previousAccumulator = accumulator
        callback(accumulator, current, stack, poset)
        if (accumulator === undefined)
          accumulator = previousAccumulator
      }

      // log if this vertex depends on a leaf
      visited.set(current, foundLeaf)
    }

    return visited.get(current)
  }
}

module[ExportExtension](Object, reduce)