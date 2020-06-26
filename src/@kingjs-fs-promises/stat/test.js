var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Read, Unlink, Write }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

async function test() {
  var path = Path.parse('acme.txt')

  await path[Write]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[Read]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]('acme.txt')
  assert.ok(!await path[Exists]())
}
test()
