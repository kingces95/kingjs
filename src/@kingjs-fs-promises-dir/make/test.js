var { assert,
  '@kingjs': { Path,
    '-fs-promises': { Exists,
      '-file': { 
        Write: WriteFile 
      },
      '-dir': { 
        Make: MakeDir,
        Remove: RemoveDir
      } 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

async function test() {
  var cwd = Path.dot
  var acme = cwd.to('acme')
  var foo = acme.to('foo')
  var txt = foo.to('bar.txt')

  await foo[MakeDir]()
  assert.ok(await acme[Exists]())
  assert.ok(await foo[Exists]())
  await txt[WriteFile]('utf8')

  await acme[RemoveDir]()
  assert.ok(!await acme[Exists]())
}
test()
