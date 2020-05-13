var { assert,
  '@kingjs': {
    '-reflect': { is },
    '-interface': { Interface },
    '-module': { ExportStaticExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * 
 * @this any The interface
 * @param {*} target The object on which to implement the interface
 * @param {*} descriptor A descriptor of properties with 
 * function values or get and/or set functions. 
 */
function implement(target, descriptor) {

  // implement the interface with the members found
  // on the descriptor by using the interface to map 
  // the desciptor names to symbols before copying them
  // to the prototype
  for (var name in descriptor) {
    var member = descriptor[name]

    var symbols = this[name]
    assert(symbols)

    if (!is.array(symbols))
      symbols = [symbols]

    for (var symbol of symbols)
      target[symbol] = member
  }

  assert(target instanceof this)
  return target
}

module[ExportStaticExtension](Interface, implement)