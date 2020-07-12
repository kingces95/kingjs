var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Read, Unlink, Write }
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

  var actual = path[Read]('utf8')
  assert.equal('Hello World!', actual)
  
  var result = path[Unlink](options)
  assert.ok((result instanceof Promise) == async)
  await result

  assert.ok(!path[Exists]())
}

process.nextTick(async() => {
  await test(Async)
  await test(Sync)
})

