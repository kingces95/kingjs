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

var Order = {
  pre: 'pre',
  in: 'in',
  post: 'post'
}

function toArray(value) {
  if (value === undefined)
    return EmptyArray
  
  if (value instanceof Set)
    return value
  
  if (!is.array(value))
    value = [ value ]

  return value
}

function toSet(value) {
  return new Set(toArray(value))
}

function findRoots(graph) {
  return graph[Analyze]().roots
}

function format(indents, name, depth, position, hasChildren) {
  var result = ''

  if (!depth) {
    indents.length = 0
  }
  else {
    // indent for for grandparents
    while (indents.length < depth - 1)
      indents.push(Indent)

    // trim indent for excess grandparents
    indents.length = depth - 1

    // write indents followed by either ┌──, ├──, or └──, capped with ▌
    var elbow = position == 0 ? Middle : position < 0 ? Below : Above
    result += `${indents.join(EmptyString)}${elbow}${Dash}`

    // if path to parent is ┌── or ├── then the next path at that indent
    // level must be either └──, ├──, or │. If the next line is another
    // sibling of current, then that sibling will emit └──, ├──. 
    // If the next line is grandchild then a │ must be emitted.
    indents.push(position <= 0 ? BarIndent : Indent)
  }

  // if current node has children then the next line must connect the ▌
  // with either └── if the next line is a child or must be │ if the
  // next line is a grandchild of the current node.
  if (hasChildren)
    indents.push(BarIndent)

  return `${result}${FatBar}  ${name}`
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
  var result = []

  var {
    roots = findRoots(tree),
    preOrder = EmptySet,
    postOrder = EmptySet,
    inOrder = EmptySet,
  } = options

  roots = toArray(roots)

  preOrder = toSet(preOrder)
  postOrder = toSet(postOrder)
  inOrder = toSet(inOrder)

  var getOrder = name => 
    postOrder.has(name) ? Order.post :
    preOrder.has(name) ? Order.pre :
    inOrder.has(name) ? Order.in :
    null

  var rootOrder = getOrder(null) || Order.in
  for (var name of roots)
    walk(name, rootOrder)

  return result
  
  function log(indents, name, depth, position, hasChildren) {
    var line = format(indents, name, depth, position, hasChildren)
    console.log(line)
    result.push(line)
  }

  function walk(name, order, depth = 0, position = 0) {
    order = getOrder(name) || order

    var isPre = Order.pre == order
    var isPost = Order.post == order
    var isIn = Order.in == order
  
    var leafs = tree[name] || EmptyArray
    var childDepth = depth + 1

    // pre-order walk processes the current node first
    if (isPre)
      log(indents, name, depth, position, leafs.length > 0)

    // a single chlid is always first to appear before or after the current node
    if (leafs.length == 1) {
      walk(leafs[0], order, childDepth, (isPost || isIn) ? -1 : 1)
      leafs = EmptyArray
    }

    var i = 0
    var midPoint = Math.floor(leafs.length / 2)

    // first child
    if (leafs.length)
      walk(leafs[i++], order, childDepth, isPost || isIn ? -1 : 0)

    // children before in-order walks processes current node
    for (; i < midPoint; i++)
      walk(leafs[i], order, childDepth)

    // in-order walk prosesses the current node between children
    if (isIn)
      log(indents, name, depth, position, leafs.length > 1)

    // children after in-order walks processes current node
    for (; i < leafs.length - 1; i++)
      walk(leafs[i], order, childDepth)

    // last child
    if (leafs.length > 1)
      walk(leafs[i], order, childDepth, isPre || isIn ? 1 : 0)
  
    // post-order walk process the current node last
    if (isPost)
      log(indents, name, depth, position)
  }
}

module[ExportExtension](Object, print)