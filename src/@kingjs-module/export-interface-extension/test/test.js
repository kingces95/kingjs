var { assert,
  '@kingjs': {
    '-interface': { Interface },
    '-module': { ExportInterfaceExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

class IIterable extends Interface {
  static get Iterator() { return Symbol.iterator }
}

module[ExportInterfaceExtension](IIterable, function count() {
  var i = 0
  for (var o in this)
    i++
  return i
})

var Count = module.exports

assert.equal([0, 1, 2][Count](), 3)