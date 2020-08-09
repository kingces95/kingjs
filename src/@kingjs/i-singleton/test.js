var { assert,
  '@kingjs': { ISingleton },
} = module[require('@kingjs-module/dependencies')]()

assert.equal(ISingleton.name, 'ISingleton')

assert.equal(
  ISingleton.IsSingleton, 
  Symbol.for('ISingleton.isSingleton, @kingjs')
)