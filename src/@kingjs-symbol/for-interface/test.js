var { assert,
  '@kingjs-symbol': { forInterface }
} = module[require('@kingjs-module/dependencies')]()

var moveNext = forInterface('@kingjs-foo', 'IEnumerable', 'moveNext')
var cachedMoveNext = Symbol.for('IEnumerable.moveNext, @kingjs-foo')
assert.ok(moveNext, cachedMoveNext)