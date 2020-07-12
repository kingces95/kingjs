var { assert,
  '@kingjs': { Path,
    '-fs': { Exists,
      '-promises-file': {
        Copy: CopyAsync,
      },
      '-file': { 
        Unlink,
        Copy, 
        Write,
        Read 
      },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var Sync = { }

async function test(options) {
  var { async = false } = options

  var cwd = Path.dot
  var acme = cwd.to('acme.txt')
  var ecma = cwd.to('ecma.txt')

  acme[Write]('Hello World!')
  var result = acme[async ? CopyAsync : Copy](ecma)
  assert.ok((result instanceof Promise) == async)
  await result

  assert.ok(ecma[Exists]())

  assert.equal('Hello World!', ecma[Read]('utf8'))
  
  acme[Unlink]()
  assert.ok(!acme[Exists]())
}

process.nextTick(async() => {
  await test(Async)
  await test(Sync)
})