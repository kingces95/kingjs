var { assert,
  '@kingjs': { Path,
    '-fs': { Exists: ExistsSync, Stat: StatSync,
      '-promises': { Exists: ExistsAsync, Stat: StatAsync,
        '-file': {
          Copy: CopyAsync,
          Read: ReadAsync,
          Write: WriteAsync,
          Unlink: UnlinkAsync,
        },
      },
      '-file': { 
        Copy: CopySync, 
        Unlink: UnlinkSync,
        Write: WriteSync,
        Read: ReadSync,
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

async function test(Copy, Read, Write, Unlink, Exists, Stat) {
  var cwd = Path.dot
  var acme = cwd.to('acme.txt')
  var ecma = cwd.to('ecma.txt')

  // write
  var expected = 'Hello World!'
  var writeResult = acme[Write](expected)
  assert.ok((writeResult instanceof Promise) == (Write == WriteAsync))
  await writeResult

  // copy
  var copyResult = acme[Copy](ecma)
  assert.ok((copyResult instanceof Promise) == (Copy == CopyAsync))
  await copyResult

  // exists
  var existsResult = ecma[Exists]()
  assert.ok((copyResult instanceof Promise) == (Exists == ExistsAsync))
  assert.ok(await existsResult)

  // stat
  var statResult = ecma[Stat]()
  assert.ok((statResult instanceof Promise) == (Stat == StatAsync))
  var stat = await statResult
  assert.ok(stat.mtime)

  // read
  var readResult = ecma[Read]('utf8')
  assert.ok((readResult instanceof Promise) == (Read == ReadAsync))
  var actual = await readResult
  assert.equal(actual, expected)
  
  // unlink copy
  var unlinkResult = ecma[Unlink]()
  assert.ok((unlinkResult instanceof Promise) == (Unlink == UnlinkAsync))
  await unlinkResult
  assert.ok(!await ecma[Exists]())

  // unlink original
  await acme[Unlink]()
  assert.ok(!await acme[Exists]())
}

process.nextTick(async() => {
  await test(CopySync, ReadSync, WriteSync, UnlinkSync, ExistsSync, StatSync)
  await test(CopyAsync, ReadAsync, WriteAsync, UnlinkAsync, ExistsAsync, StatAsync)
})