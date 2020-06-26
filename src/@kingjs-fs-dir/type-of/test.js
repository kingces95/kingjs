var { assert,
  '@kingjs': { Path,
    '-fs': {
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

  var entries = await acme[List](WithFileTypes)
  var file = entries.filter(o => o.name == 'foo.txt')[0]
  var dir = entries.filter(o => o.name == 'bar')[0]

  assert.ok(file.isFile)
  assert.ok(dir.isDirectory)
  
  await acme[RemoveDir]()
}
test()
