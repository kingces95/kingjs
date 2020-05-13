var { assert,
  '@kingjs': { IEnumerable },
} = module[require('@kingjs-module/dependencies')]()

assert.equal(IEnumerable.name, 'IEnumerable')

assert.equal(
  IEnumerable.getEnumerator, 
  Symbol.for('IEnumerable.getEnumerator, @kingjs')
)