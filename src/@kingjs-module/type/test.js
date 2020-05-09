var { assert,
  '@kingjs': {
    '-module': { type: Module }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.equal(Module, Object.getPrototypeOf(module).constructor)