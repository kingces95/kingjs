var { assert,
  '@kingjs': {
    '-reflect': { IsNumber },
    '-buffer': { GetHashcode }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.ok(IsNumber(Buffer.from('foo')[GetHashcode]()))