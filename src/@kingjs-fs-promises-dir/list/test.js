var { assert,
  '@kingjs': { Path,
    '-fs-promises': {
      '-file': { Write: WriteFile },
      '-dir': { 
        List: List,
        Make: MakeDir, 
        Remove: RemoveDir 
      },
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
  assert.deepEqual([
    'bar', 'foo.txt'
  ], list.map(o => o.name))

  var { directories, files} = await acme[List](WithFileTypes)
  assert.deepEqual([ 'bar' ], directories.map(o => o.name))
  assert.deepEqual([ 'foo.txt' ], files.map(o => o.name))
  
  await acme[RemoveDir]()
}
test()
