var { assert, 
  '@kingjs': {
    EmptyBuffer
  }
} = module[require('@kingjs-module/dependencies')]()

assert.ok(EmptyBuffer.length == 0)