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

  assert.deepEqual([ 'bar' ], dirent.filter(o => o.isDirectory).map(o => o.name))
  assert.deepEqual([ 'foo.txt' ], dirent.filter(o => o.isFile).map(o => o.name))
  
  var removeResult = acme[Remove]()
  assert.ok((removeResult instanceof Promise) == (Remove == RemoveAsync))
  await removeResult

  assert.ok(!acme[Exists]())
}

process.nextTick(async() => {
  await test(ListSync, MakeSync, RemoveSync)
  await test(ListAsync, MakeAsync, RemoveAsync)
})
