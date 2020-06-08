var { assert,
  '@kingjs': { Path,
    '-fs': {
      '-dir': { Partition },
      '-promises': {
        '-file': { Write: WriteFile },
        '-dir': { 
          List,
          Make: MakeDir, 
          Remove: RemoveDir 
        },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var WithFileTypes = { withFileTypes: true }

async function test() {
  var { dot } = Path
  var acme = dot.to('acme')
  var foo = acme.to('foo.txt')
  var bar = acme.to('bar')

  await acme[MakeDir]()
  await bar[MakeDir]()
  await foo[WriteFile]('Hello World!')

  var list = await acme[List]()
  assert.deepEqual([ 'bar', 'foo.txt' ], list)

  var entries = await acme[List](WithFileTypes)
  var { directories, files } = entries[Partition]()

  assert.deepEqual([ 'bar' ], directories)
  assert.deepEqual([ 'foo.txt' ], files)
  
  await acme[RemoveDir]()
}
test()
