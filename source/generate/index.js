var assert = require('assert')
var is = require('@kingjs/reflect.is')
var ts = require('typescript')
var beautify = require('js-beautify').js

var Indent = 2
var SourceText = 'generated.js'
var LanguageVersion = ''
var ScriptTarget = ts.ScriptTarget.ES2020
var ScriptKind = ts.ScriptKind.JS
var NewLine = '\n'

function toAst(o) {
  if (o instanceof String)
    return ts.createStringLiteral(o)
  
  if (typeof o == 'string')
    return ts.createIdentifier(o)

  if (is.boolean(o) || is.number(o))
    return ts.createLiteral(o)

  if (is.null(o))
    return ts.createNull()

  if (o instanceof Node)
    return o.ast

  if (is.array(o))
    return o.map(x => toAst(x))

  if (is.undefined(o))
    return undefined

  assert(false, `Failed to covert value '${o}' to an ast node.`)
}

class Node {
  constructor(ast) {
    this.ast = ast
  }

  toString() {
    var resultFile = ts.createSourceFile(SourceText, LanguageVersion, ScriptTarget, false, ScriptKind);
    var printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    var js = printer.printNode(ts.EmitHint.Unspecified, this.ast, resultFile)
    return beautify(js, { indent_size: Indent })
  }
}

class Identifier extends Node {
  constructor(id) {
    super(ts.createLiteral(id))
  }
}

class Call extends Node {
  constructor(name, args) {
    super(ts.createCall(toAst(name), null, toAst(args)))
  }
}

class Assignment extends Node {
  constructor(left, right) {
    super(ts.createAssignment(toAst(left), toAst(right)))
  }
}

class PropertyAssignment extends Node {
  constructor(name, initializer) {
    super(ts.createPropertyAssignment(toAst(name), toAst(initializer)))
  }
}

class ElementAccess extends Node {
  constructor(name, element) {
    super(ts.createElementAccess(toAst(name), toAst(element)))
  }
}

class ObjectLiteral extends Node {
  constructor() {
    super(ts.createObjectLiteral(toAst([...arguments])))
  }
}

class ObjectBindingPattern extends Node {
  constructor(bindingElements) {
    super(ts.createObjectBindingPattern(toAst(bindingElements)))
  }
}

class BindingElement extends Node {
  constructor(value, property, initializer) {
    super(ts.createBindingElement(undefined, toAst(property), toAst(value), toAst(initializer)))
  }
}

class Statement extends Node {
  constructor(expression) {
    super(ts.createStatement(toAst(expression)))
  }
}

class File extends Node {
  constructor() {
    super([...arguments])
  }

  toString() {
    return this.ast.map(o => o.toString()).join(NewLine)
  }
}

class Block extends Node {
  constructor(statements) {
    super(ts.createBlock(toAst(statements), true))
  }
}

module.exports = {
  Node, 
  Identifier, 
  Call, 
  Assignment, 
  PropertyAssignment, 
  ElementAccess,
  ObjectLiteral, 
  ObjectBindingPattern, 
  BindingElement,
  Statement,
  File,
  Block
}
