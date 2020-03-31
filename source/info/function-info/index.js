var {
  assert,
  ['@kingjs']: { 
    stringEx: { JoinLines },
    source: {
      types: {
        JSDocComment,
        JSDocThisTag,
        JSDocReturnTag,
        JSDocParameterTag,
        JSDocCallbackTag,
        FunctionDeclaration
      }
    }
  }
} = require('./dependencies')

var NewLine = '\n'
var EmptyString = ''
var Callback = 'callback'
var This = 'this'
var Return = 'return'
var Returns = 'returns'
var Remarks = 'remarks'
var Param = 'param'
var See = 'see'
var Description = 'description'

class SignatureInfo {
  static create(tag, parent) {
    if (!tag)
      return

    if (tag instanceof JSDocParameterTag)
      return new FormalParameterInfo(tag, parent)

    if (tag instanceof JSDocReturnTag)
      return new ReturnParameterInfo(tag, parent)

    if (tag instanceof JSDocThisTag)
      return new ThisParameterInfo(tag, parent)

    if (tag instanceof JSDocCallbackTag)
      return new CallbackInfo(tag, parent)

    if (tag.tagName == Remarks)
      return new RemarksInfo(tag, parent)

    if (tag.tagName == Description)
      return new DescriptionInfo(tag, parent)

    if (tag.tagName == See)
      return new SeeInfo(tag, parent)
  }

  constructor(tag, parent) {
    this.parent = parent
    this.comment = tag.comment ? tag.comment[JoinLines]() : EmptyString

    // hack fullName support to enable documenting descriptor properties
    // e.g. `descriptor.callback`
    if (tag.name)
      this.name = tag.name

    if (tag.fullName)
      this.name = tag.fullName
  }

  toString() { return this.comment }
}

class SeeInfo extends SignatureInfo {
  constructor(tag, parent) {
    assert(tag.tagName == See)
    super(tag, parent)
  }
}

class DescriptionInfo extends SignatureInfo {
  constructor(tag, parent) {
    assert(tag.tagName == Description)
    super(tag, parent)
  }
}

class RemarksInfo extends SignatureInfo {
  constructor(tag, parent) {
    assert(tag.tagName == Remarks)
    super(tag, parent)

    var comment = tag.comment
    comment = comment.replace(/^(?!---$)[-]+/, 
      // special sauce e.g. '-- foo' -> ' - foo'
      o => '-'.padStart(o.length * 2, ' ')
    )
    this.comment = comment[JoinLines]()
  }
}

class ParameterInfo extends SignatureInfo {
  constructor(tag, parent) {
    super(tag, parent)
    this.isOptional = false
  }

  toString() { return this.name }
}

class FormalParameterInfo extends ParameterInfo {
  constructor(tag, parent) {
    assert(tag instanceof JSDocParameterTag)
    super(tag, parent)

    this.isFormal = true
    this.isOptional = tag.isBracketed
  }
}

class ThisParameterInfo extends ParameterInfo {
  constructor(tag, parent) {
    assert(tag instanceof JSDocThisTag)
    super(tag, parent)

    this.name = This
    this.isThis = true
  }
}

class ReturnParameterInfo extends ParameterInfo {
  constructor(tag, parent) {
    assert(tag instanceof JSDocReturnTag)
    super(tag, parent)

    this.isReturn = true
  }
}

class FunctionInfo extends SignatureInfo {
  constructor(tag, parent) {
    super(tag, parent)
    this.returns = null
    this.parameters = { }
  }

  toString() { return this.name }
}

class CallbackInfo extends FunctionInfo {
  constructor(tag, parent) {
    assert(tag instanceof JSDocCallbackTag)
    super(tag, parent)

    var { type, parameters = [] } = tag.typeExpression

    // ReturnParameterInfo 
    this.returns = ParameterInfo.create(type)

    for (var parameter of parameters) {
      
      // FormalParameterInfo
      var parameterInfo = ParameterInfo.create(parameter)
      this.parameters[parameterInfo.name] = parameterInfo
    }

    // join callbacks to their parameters
    this.parameter = this.parent[this.name]
    if (parameter instanceof FormalParameterInfo) {
      parameter.hasCallback = true
      parameter.callback = this
    }
  }
}

class DeclaredFunctionInfo extends FunctionInfo {

  constructor(functionDeclaration, parent) {
    assert(functionDeclaration instanceof FunctionDeclaration)
    super(functionDeclaration, parent)

    this.description = EmptyString
    this.remarks = [ ]
    this.signature = null
    this.callbacks = { }
    this.callback = { }
    this.see = [ ]

    // harvest JSDoc, assume a single JSDoc block
    var { jsDoc: [ { tags = [] } ] } = functionDeclaration
    for (var tag of tags) {
      var info = SignatureInfo.create(tag, this)
      if (info instanceof ReturnParameterInfo)
        this.returns = info
      else if (info instanceof ParameterInfo)
        this.parameters[info.name] = info
      else if (info instanceof CallbackInfo)
        this.callbacks[info.name] = info
      else if (info instanceof RemarksInfo)
        this.remarks.push(info)
      else if (info instanceof DescriptionInfo)
        this.description = info.toString()
      else if (info instanceof SeeInfo)
        this.see.push(info)
    }

    // join remarks
    this.remarks = this.remarks.join(NewLine)

    // create documentation signature
    this.signature = createSignature(this.parameters, this.name)
  }

  toString() { 
    return this.signature 
  }
}

function createSignature(parameters, name) {
  var signature = Object.keys(parameters)

  // exclude descriptor property documentation
  // e.g. descriptor.lazy
  signature = signature.filter(x => x.indexOf('.') == -1)

  var tokens = []
  return `${name}(${pushTokens(0).join('')})`

  // example(foo[, bar[, baz]])
  function pushTokens(i) {
    if (i == signature.length)
      return tokens

    var name = signature[i]
    var parameter = parameters[name]
    var isOptional = parameter.isOptional
    if (isOptional)
      tokens.push('[')

    if (i > 0)
      tokens.push(', ')

    tokens.push(parameter.hasCallback ? 
      createSignature(parameter.callback.parameters, name) : name)
    pushTokens(++i)

    if (isOptional)
      tokens.push(']')
    return tokens
  }
}

module.exports = DeclaredFunctionInfo