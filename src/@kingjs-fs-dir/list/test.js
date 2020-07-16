var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-file': { Write: WriteFile },
      '-promises-dir': {
        List: ListAsync,
        Make: MakeAsync,
        Remove: RemoveAsync,
      },
      '-dir': { 
        List: ListSync,
        Make: MakeSync, 
        Remove: RemoveSync 
      },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

async function test(List, Make, Remove) {
  var { dot } = Path
  var acme = dot.to('acme')
  var foo = acme.to('foo.txt')
  var bar = acme.to('bar')
  
  await acme[Make]()
  
  var makeResult = bar[Make]()
  assert.ok((makeResult instanceof Promise) == (Make == MakeAsync))

  foo[WriteFile]('Hello World!')
  
  var listResult = acme[List]()
  assert.ok((listResult instanceof Promise) == (List == ListAsync))
  var dirent = await listResult

  var directories = dirent.filter(o => o.isDirectory)
  assert.deepEqual([ 'bar' ], directories.map(o => o.name))
  var barDir = directories[0]
  assert.equal(barDir.toString(), 'acme/bar')

  var files = dirent.filter(o => o.isFile)
  assert.deepEqual([ 'foo.txt' ], files.map(o => o.name))
  var fooFile = files[0]
  assert.equal(fooFile.toString(), 'acme/foo.txt')
  
  var removeResult = acme[Remove]()
  assert.ok((removeResult instanceof Promise) == (Remove == RemoveAsync))
  await removeResult

  assert.ok(!acme[Exists]())
}

process.nextTick(async() => {
  await test(ListSync, MakeSync, RemoveSync)
  await test(ListAsync, MakeAsync, RemoveAsync)
})
