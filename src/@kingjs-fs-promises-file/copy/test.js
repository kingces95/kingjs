var { assert,
  '@kingjs': { Path,
    '-fs-promises': { Exists,
      '-file': { 
        Unlink,
        Copy: CopyFile, 
        Write: WriteFile,
        Read: ReadFile 
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

async function test() {
  var cwd = Path.dot
  var acme = cwd.to('acme.txt')
  var ecma = cwd.to('ecma.txt')

  await acme[WriteFile]('Hello World!')
  await acme[CopyFile](ecma)
  assert.ok(await ecma[Exists]())

  assert.equal('Hello World!', await ecma[ReadFile]('utf8'))
  
  await acme[Unlink]()
  assert.ok(!await acme[Exists]())

  await ecma[Unlink]()
  assert.ok(!await ecma[Exists]())
}
test()
