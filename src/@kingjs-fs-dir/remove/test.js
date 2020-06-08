var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Write: WriteFile },
      '-dir': { 
        Remove: RemoveDir,
        Make: MakeDir 
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var cwd = Path.dot
var acme = cwd.to('acme')
var foo = acme.to('foo')
var txt = foo.to('bar.txt')

foo[MakeDir]()
assert.ok(acme[Exists]())
assert.ok(foo[Exists]())
txt[WriteFile]('utf8')

acme[RemoveDir]()
assert.ok(!acme[Exists]())
