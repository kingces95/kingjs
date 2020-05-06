var {
  assert,
  '@kingjs': { 
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
} = module[require('@kingjs-module/dependencies')]()

var NewLine = '\n'
var Callback = 'callback'
var This = 'this'
var Remarks = 'remarks'
var See = 'see'
var Description = 'description'

class SignatureInfo {
  static create(tag) {
    if (!tag)
      return

    if (tag instanceof JSDocParameterTag)
      return new FormalParameterInfo(tag)

    if (tag instanceof JSDocReturnTag)
      return new ReturnParameterInfo(tag)

    if (tag instanceof JSDocThisTag)
      return new ThisParameterInfo(tag)

    if (tag instanceof JSDocCallbackTag)
      return new CallbackInfo(tag)

    if (tag.tagName == Remarks)
      return new RemarksInfo(tag)

    if (tag.tagName == Description)
      return new DescriptionInfo(tag)

    if (tag.tagName == See)
      return new SeeInfo(tag)
  }

  constructor(tag) {
    if (tag.comment)
      this.comment = tag.comment[JoinLines]()

    // hack fullName support to enable documenting descriptor properties
    // e.g. `descriptor.callback`
    if (tag.name)
      this.name = tag.name

    if (tag.fullName)
      this.name = tag.fullName
  }

  toString() { return this.comment }
}

class SeeInfo {
  constructor(tag) {
    assert(tag.tagName == See)
    var [ packageClass = "", fieldMethod = "" ] = tag.comment.split('#')

    // everything before the first capitalized name is the package
    // everything after the first capitalized name is the class
    // both the package and class are optional
    var { index = packageClass.length + 1 } = /[A-Z]/g.exec(packageClass) || { }
    this.packageName = packageClass.substring(0, index - 1)
    if (!this.packageName)
      delete this.packageName;

    this.className = packageClass.substring(index)
    if (!this.className)
      delete this.className

    if (fieldMethod) {
      var { index } = /[(]/g.exec(fieldMethod) || { }

      if (index) {
        this.methodName = fieldMethod.substring(0, index)
        this.signature = fieldMethod.substring(index + 1, fieldMethod.length - 1)
          .split(/\s*[,]\s*/)
          .map(o => o.split(/\s+/))
          .filter(o => o[0])
          .map(x => { 
            var param = { type: x[0] }
            if (x[1])
              param.name = x[1]
            return param
          })
      }
      else {
        this.fieldName = fieldMethod
      }
    }
  }
}

class DescriptionInfo extends SignatureInfo {
  constructor(tag) {
    assert(tag.tagName == Description)
    super(tag)
  }
}

class RemarksInfo extends SignatureInfo {
  constructor(tag) {
    assert(tag.tagName == Remarks)
    super(tag)

    var comment = tag.comment
    comment = comment.replace(/^(?!---$)[-]+/, 
      // special sauce e.g. '-- foo' -> ' - foo'
      o => '-'.padStart(o.length * 2, ' ')
    )
    this.comment = comment[JoinLines]()
  }
}

class ParameterInfo extends SignatureInfo {
  constructor(tag) {
    super(tag)
  }

  toString() { return this.name }
}

class FormalParameterInfo extends ParameterInfo {
  constructor(tag) {
    assert(tag instanceof JSDocParameterTag)
    super(tag)

    if (tag.isBracketed)
      this.isOptional = true
  }

  get isFormal() { return true }
}

class ThisParameterInfo extends ParameterInfo {
  constructor(tag) {
    assert(tag instanceof JSDocThisTag)
    super(tag)

    this.name = This
  }

  get isThis() { return true }
}

class ReturnParameterInfo extends ParameterInfo {
  constructor(tag) {
    assert(tag instanceof JSDocReturnTag)
    super(tag)
  }

  get isReturn() { return true }
}

class FunctionInfo extends SignatureInfo {
  constructor(tag) {
    super(tag)
    this.parameters = { }
  }

  toString() { return this.name }
}

class CallbackInfo extends FunctionInfo {
  constructor(tag) {
    assert(tag instanceof JSDocCallbackTag)
    super(tag)

    // set default name
    if (!this.name)
      this.name = Callback

    var { type, parameters = [] } = tag.typeExpression

    // ReturnParameterInfo 
    this.returns = ParameterInfo.create(type)

    for (var parameter of parameters) {
      
      // FormalParameterInfo
      var parameterInfo = ParameterInfo.create(parameter)
      this.parameters[parameterInfo.name] = parameterInfo
    }
  }
}

class DeclaredFunctionInfo extends FunctionInfo {

  constructor(functionDeclaration) {
    assert(functionDeclaration instanceof FunctionDeclaration)
    super(functionDeclaration)

    this.remarks = [ ]
    this.see = [ ]

    var callbacks = { }

    // harvest JSDoc, assume a single JSDoc block
    var { jsDoc: [ { tags = [] } ] } = functionDeclaration
    for (var tag of tags) {
      var info = SignatureInfo.create(tag, this)
      if (info instanceof ReturnParameterInfo)
        this.returns = info
      else if (info instanceof ParameterInfo)
        this.parameters[info.name] = info
      else if (info instanceof CallbackInfo)
        callbacks[info.name] = info
      else if (info instanceof RemarksInfo)
        this.remarks.push(info)
      else if (info instanceof DescriptionInfo)
        this.description = info.toString()
      else if (info instanceof SeeInfo)
        this.see.push(info)
    }

    // join callbacks to their parameters
    for (var name in callbacks) {
      var callback = callbacks[name]
      var parameter = this.parameters[name]

      assert(parameter instanceof FormalParameterInfo)
      parameter.hasCallback = true
      parameter.callback = callback
    }

    // join remarks
    this.remarks = this.remarks.join(NewLine)

    // create documentation signature
    this.api = createSignature(this.parameters, this.name)
  }

  toString() { 
    return this.api 
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