var { assert,
  '@kingjs': { Path,
    '-fs-promises': { Exists,
      '-file': { 
        Unlink,
        Write: WriteFile,
        Read: ReadFile 
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

async function test() {
  var path = Path.parse('acme.txt')

  await path[WriteFile]('Hello World!')
  assert.ok(await path[Exists]())

  var actual = await path[ReadFile]('utf8')
  assert.equal('Hello World!', actual)
  
  await path[Unlink]('acme.txt')
  assert.ok(!await path[Exists]())
}
test()
