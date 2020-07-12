var { assert,
  '@kingjs': { Path,
    '-fs': { Exists, Stat,
      '-file': { Unlink, Write }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var Sync = { }

async function test(options) {
  var { async = false } = options

  var path = Path.parse('acme.txt')

  path[Write]('Hello World!')
  assert.ok(path[Exists]())

  var result = path[Stat](options)
  assert.ok((result instanceof Promise) == async)
  result = await result
  assert.ok(result.mtime)
  
  path[Unlink]('acme.txt')
  assert.ok(!path[Exists]())
}

process.nextTick(async() => {
  await test(Async)
  await test(Sync)
})