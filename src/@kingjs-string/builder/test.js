var { assert,
  '@kingjs': {
    '-string': { Builder: StringBuilder },
  }
} = module[require('@kingjs-module/dependencies')]()

var sb = new StringBuilder(Buffer.from('Hello World!'))
assert.equal(sb.toString(), 'Hello World!')