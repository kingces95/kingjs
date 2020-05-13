var { assert,
  '@kingjs-symbol': { forExtension }
} = module[require('@kingjs-module/dependencies')]()

var moveNext = forExtension('@kingjs-foo', 'exportExtension', '1.2.3')
var cachedMoveNext = Symbol.for('exportExtension, @kingjs-foo, v1.2.3')
assert.ok(moveNext, cachedMoveNext)