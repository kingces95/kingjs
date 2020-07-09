var { assert,
  '@kingjs': {
    '-symbol': { GetHashcode },
    '-reflect': { isNumber },
  }
} = module[require('@kingjs-module/dependencies')]()

var symbol = Symbol.for('mySymbol')
assert.ok(isNumber(Symbol[GetHashcode](symbol)))

var otherSymbol = Symbol.for('myOtherSymbol')
assert.notEqual(Symbol[GetHashcode](symbol), Symbol[GetHashcode](otherSymbol))