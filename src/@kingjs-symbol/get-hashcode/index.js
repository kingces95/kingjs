var { assert,
  '@kingjs': { 
    '-module': { ExportStaticExtension },
    '-reflect': { IsSymbol },
    '-string': { GetHashcode: GetStringHashcode }
  }
} = module[require('@kingjs-module/dependencies')]()

var map = new Map()

/**
 * @description Return a hashcode for a symbol.
 * @this this The symbol.
 * @return Returns a hashcode for `symbol`.
 */
function getHashcode(symbol) {
  assert.ok(IsSymbol(symbol))
  if (!map.has(symbol))
    map.set(symbol, symbol.toString()[GetStringHashcode]())
  return map.get(symbol)
}

module[ExportStaticExtension](Symbol, getHashcode)