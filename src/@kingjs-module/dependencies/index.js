var Module = require("@kingjs-module/module")
var ExportExtension = require("@kingjs-module/export-extension")
var Split = require("@kingjs-camel-case/split")
var Append = require("@kingjs-buffer/append")

var EmptyBuffer = Buffer.from('')
var At = '@'
var Dash = '-'
var Dot = '.'
var ForwardSlash = '/'
var KnownNames = new Map()

KnownNames.set('ChildProcess', 'child_process')
KnownNames.set('StringDecoder', 'string_decoder')

function dependencies(prefix = EmptyBuffer) {
  return new Proxy(prefix, {
    get: (prefix, key) => {

      var keyZero = key[0]
      if (keyZero == At || keyZero == Dash || keyZero == Dot || keyZero == ForwardSlash) 
        return dependencies.call(this, prefix[Append](key))
      
      if (prefix.length == 0) {
        if (KnownNames.has(key))
          key = KnownNames.get(key)
      }
      else {
        prefix = prefix[Append](ForwardSlash)
      }

      var moduleName = prefix[Append](
        key[Split]().join(Dash)
      ).toString()

      return this.require(moduleName)
    }
  })
}

module[ExportExtension](Module, dependencies)