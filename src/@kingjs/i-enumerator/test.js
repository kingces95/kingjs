var { assert,
  '@kingjs': { IEnumerator }
} = module[require('@kingjs-module/dependencies')]()

var MoveNext = Symbol.for('IEnumerator.moveNext, @kingjs')
var Current = Symbol.for('IEnumerator.current, @kingjs')

assert.equal(IEnumerator.name, 'IEnumerator')
assert.equal(IEnumerator.MoveNext, MoveNext)
assert.equal(IEnumerator.Current, Current)