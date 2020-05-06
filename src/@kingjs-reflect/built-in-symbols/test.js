var { assert,
  '@kingjs': {
    '-reflect': { builtInSymbols }
  }
} = module[require('@kingjs-module/dependencies')]()

// all builtInSymbols are in Symbol
for (var symbol of Object.getOwnPropertySymbols(builtInSymbols)) {
  var name = builtInSymbols[symbol]
  assert(Symbol[name] === symbol)
}

// all Symbols are in builtInSymbols
for (var name of Object.getOwnPropertyNames(Symbol)) {
  var symbol = Symbol[name]
  if (typeof symbol != 'symbol')
    continue
  assert(builtInSymbols[symbol] == name)
}