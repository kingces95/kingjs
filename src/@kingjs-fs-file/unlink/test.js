var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Read, Unlink, Write }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

function test() {
  var path = Path.parse('acme.txt')

  path[Write]('Hello World!')
  assert.ok(path[Exists]())

  var actual = path[Read]('utf8')
  assert.equal('Hello World!', actual)
  
  path[Unlink]()
  assert.ok(!path[Exists]())
}
test()
