var { 
  assert,
  isBuiltinModule,
  '@kingjs': {
    stringEx: { Builder: StringBuilder },
    Path,
    buffer: { Append },
    package: {
      name: {
        construct,
        parse
      }
    }
  }
} = require('./dependencies')

var Dash = '-'
var Underscore = '_'
var Dot = '.'
var At = '@'
var ForwardSlash = '/'
var Scope = Symbol('scope')

function delimiter() {
  if (this.isBuiltinModule)
    return Underscore

  return Dash
}

class NameBuilder extends StringBuilder {
  static parse(name) {
    assert(name)

    var { scope, segments } = parse(name)
    segments = segments.reverse()
    var name = segments.pop()

    var result = NameBuilder.create(name, scope)

    while (segments.length)
      result = result.to(segments.pop())

    return result
  }

  static create(name, scope) {
    var buffer = Buffer.alloc(0)
    if (scope)
      buffer = buffer[Append](At, scope, ForwardSlash)
    buffer = buffer[Append](name)

    var result = new NameBuilder(buffer, name)

    if (scope)
      result[Scope] = scope

    return result
  }

  static fromPath(path, scope) {
    assert(path.isNamed)

    if (path.parent && path.parent.isNamed)
      return NameBuilder.fromPath(path.parent, scope).to(path.name)

    return NameBuilder.create(path.name, scope)
  }

  constructor(buffer, name, parent) {
    super(buffer)

    this.parent = parent
    this.name = name
  }

  get scope() {
    if (this.parent)
      return this.parent[Scope]

    return this[Scope]
  }

  get parts() {
    return this.name.split(delimiter.call(this))
  }

  get namespace() {
    var start = this.scope ? 
      At.length + this.scope.length + ForwardSlash.length : 0
    return this.buffer.slice(start).toString()
  }

  get isBuiltinModule() {
    if (this.parent)
      return false

    if (this.scope)
      return false
    
    return isBuiltinModule(this.name)
  }

  toPath(path = Path.dot) {
    path = Path.parse(path)

    if (this.parent)
      path = this.parent.toPath(path)
  
    return path.to(this.name)
  }

  to(name) {
    assert(name)
    return new NameBuilder(this.buffer[Append](Dot, name), name, this)
  }

  equals(other) {
    if (!other)
      return false

    if ((other instanceof NameBuilder) == false)
      return false

    if (!!this.parent != !!other.parent)
      return false

    if (this.parent && !this.parent.equals(other.parent))
      return false

    if (!this.parent && this.scope != other.scope)
      return false

    return this.name == other.name
  }
}

module.exports = NameBuilder