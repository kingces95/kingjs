var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Unlink, Read, Write }
    },
  },
} = module[require('@kingjs-module/dependencies')]()

var Async = { }
var Sync = { sync: true }

async function test(options) {
  var { sync = false } = options

  var path = Path.parse('acme.txt')

  path[Write]('Hello World!')
  var result = path[Exists](options)
  assert.ok((result instanceof Promise) != sync)
  assert.ok(await result)

  var actual = path[Read]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]('acme.txt')
  assert.ok(!await path[Exists](options))
}

process.nextTick(async() => {
  await test(Sync)
  await test(Async)
})
