var { assert,
  '@kingjs': { Path,
    '-package': { Package },
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var DashPromises = '-promises'
var EmptyString = ''

function stub(module, optionsIndex) {
  var { scope, name } = Package.fromPath(module.path)
  scope = scope.replace(DashPromises, EmptyString)
  var target = require(`@${scope}/${name}`)

  module[ExportExtension](Path.Builder, function() {
    var args = [...arguments]
    args[optionsIndex] = { ...args[optionsIndex], async: true }
    var result = this[target].call(this, ...args)
    assert(result instanceof Promise)
    return result
  })

  return module.exports
}

module.exports = stub