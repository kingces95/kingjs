var { 
  assert,
  '@kingjs': {
    graph: { Analyze },
    reflect: { is },
    module: { ExportExtension },
  }
} = require('./dependencies')

var current = { }
var EmptyArray = [ ]
var EmptyString = ''
var EmptySet = new Set()

var FatBar = '▌'
var Below  = '┌'
var Middle = '├'
var Above  = '└'
var Dash   = '──'
var Return = '\n'
var Indent = '   '
var BarIndent = '│  '

var stdout = process.stdout
var write = text => stdout.write(text)
var writeLine = text => write(text + Return)

function toArray(value) {
  if (!value)
    return EmptyArray
  
  if (value instanceof Set)
    return value
  
  if (is.string(value))
    value = [ value ]

  return value
}

function toSet(value) {
  if (!value)
    return EmptySet

  return new Set(toArray(value))
}

function findRoots(graph) {
  return graph[Analyze]().roots
}

function log(indents, name, depth, position, hasChildren) {
  if (depth) {
    // indent for unaccounted for grandparents
    while (indents.length < depth - 1)
      indents.push(Indent)

    // trim indent for excess grandparents
    indents.length = depth - 1

    // write indents followed by either ┌──, ├──, or └──, capped with ▌
    var elbow = position == 0 ? Middle : position < 0 ? Below : Above
    write(`${indents.join(EmptyString)}${elbow}${Dash}`)

    // if path to parent is ┌── or ├── then the next path at that indent
    // level must be either └──, ├──, or │. If the next line is another
    // sibling of current, then that sibling will emit └──, ├──. 
    // If the next line is grandchild then a │ must be emitted.
    indents.push(position <= 0 ? BarIndent : Indent)

    // if current node has children then the next line must connect the ▌
    // with either └── if the next line is a child or must be │ if the
    // next line is a grandchild of the current node.
    if (hasChildren)
      indents.push(BarIndent)
  }

  writeLine(`${FatBar}  ${name}`)
}

/**
 * @description Prints a tree.
 * 
 * @this any The tree encoded a pojo where property name is a node,
 * and property value an array of children.
 * 
 * @returns Returns an array of strings representing each line of
 * the tree print.
 */
function print(options = current) {
  var tree = this
  var indents = []

  var {
    roots = findRoots(tree),
    preOrder = EmptySet,
    postOrder = EmptySet
  } = options

  preOrder = toSet(preOrder)
  postOrder = toSet(postOrder)
  roots = toArray(roots)

  for (var name of roots)
    walk(name)
  
  function walk(name, depth = 0, position = 0) {
    var isPost = postOrder.has(name)
    var isPre = preOrder.has(name)
    var isIn = !(isPre || isPost)
  
    var leafs = tree[name] || EmptyArray
    var childDepth = depth + 1

    // pre-order walk processes the current node first
    if (isPre)
      log(indents, name, depth, position, leafs.length > 0)

    // a single chlid is always first to appear before or after the current node
    if (leafs.length == 1) {
      walk(leafs[0], childDepth, (isPost || isIn) ? -1 : 1)
      leafs = EmptyArray
    }

    var i = 0
    var midPoint = Math.floor(leafs.length / 2)

    // first child
    if (leafs.length)
      walk(leafs[i++], childDepth, isPost || isIn ? -1 : 0)

    // children before in-order walks processes current node
    for (; i < midPoint; i++)
      walk(leafs[i], childDepth)

    // in-order walk prosesses the current node between children
    if (isIn)
      log(indents, name, depth, position, true)

    // children after in-order walks processes current node
    for (; i < leafs.length - 1; i++)
      walk(leafs[i], childDepth)

    // last child
    if (leafs.length > 1)
      walk(leafs[i], childDepth, isPre || isIn ? 1 : 0)
  
    // post-order walk process the current node last
    if (isPost)
      log(indents, name, depth, position)
  }
}

module[ExportExtension](Object, print)