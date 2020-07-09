var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Unlink, Read, Write }
    },
  },
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }

async function test(options) {
  var path = Path.parse('acme.txt')

  path[Write]('Hello World!')
  assert.ok(await path[Exists](options))

  var actual = path[Read]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]('acme.txt')
  assert.ok(!await path[Exists](options))
}

process.nextTick(async() => {
  await test()
  await test(Async)
})
