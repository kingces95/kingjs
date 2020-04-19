var { 
  assert,
  isBuiltinModule,
  '@kingjs': {
    path: { Builder: Path },
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

class NameBuilder {
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

    var result = new NameBuilder(null, name, buffer)

    if (scope)
      result[Scope] = scope

    return result
  }

  constructor(parent, name, buffer) {
    this.parent = parent
    this.name = name
    this.buffer = buffer
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

  toPath(path = Path.Relative) {
    path = Path.parse(path)

    if (this.parent)
      path = this.parent.toPath(path)
  
    return path.to(this.name)
  }

  to(name) {
    assert(name)
    return new NameBuilder(this, name, this.buffer[Append](Dot, name))
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

  toString() {
    return this.buffer.toString()
  }
}

module.exports = NameBuilder