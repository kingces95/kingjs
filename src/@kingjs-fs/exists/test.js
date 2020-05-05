var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Unlink, Read, Write }
    },
  },
} = module[require('@kingjs-module/dependencies')]()

function test() {
  var path = Path.parse('acme.txt')

  path[Write]('Hello World!')
  assert.ok(path[Exists]())

  var actual = path[Read]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]('acme.txt')
  assert.ok(!path[Exists]())
}
test()
