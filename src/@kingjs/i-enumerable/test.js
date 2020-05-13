var { assert,
  '@kingjs': { IEnumerable },
} = module[require('@kingjs-module/dependencies')]()

assert.equal(IEnumerable.name, 'IEnumerable')

assert.equal(
  IEnumerable.GetEnumerator, 
  Symbol.for('IEnumerable.getEnumerator, @kingjs')
)