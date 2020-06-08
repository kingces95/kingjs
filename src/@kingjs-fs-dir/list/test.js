var { assert,
  '@kingjs': { Path,
    '-fs': {
      '-file': { Write: WriteFile },
      '-dir': { 
        List,
        Make: MakeDir, 
        Remove: RemoveDir 
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var WithFileTypes = { withFileTypes: true }

var { dot } = Path
var acme = dot.to('acme')
var foo = acme.to('foo.txt')
var bar = acme.to('bar')

acme[MakeDir]()
bar[MakeDir]()
foo[WriteFile]('Hello World!')

var list = acme[List]()
assert.deepEqual([ 'bar', 'foo.txt' ], list)

var dirent = acme[List](WithFileTypes)
assert.deepEqual([ 'bar' ], dirent.filter(o => o.isDirectory()).map(o => o.name))
assert.deepEqual([ 'foo.txt' ], dirent.filter(o => o.isFile()).map(o => o.name))

acme[RemoveDir]()
