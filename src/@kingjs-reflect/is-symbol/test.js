var { assert,
  '@kingjs': { 
    '-reflect': { isSymbol },
  },
} = module[require('@kingjs-module/dependencies')]()

assert.ok(isSymbol(Symbol()))
assert.ok(!isSymbol({}))