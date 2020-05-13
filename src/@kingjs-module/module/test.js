var { assert,
  '@kingjs-module': { Module }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(Module, Object.getPrototypeOf(module).constructor)