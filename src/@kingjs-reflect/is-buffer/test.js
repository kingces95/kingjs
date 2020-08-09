var { assert,
  '@kingjs': { 
    '-reflect': { isBuffer },
  },
} = module[require('@kingjs-module/dependencies')]()

assert.ok(isBuffer(Buffer.from('')))