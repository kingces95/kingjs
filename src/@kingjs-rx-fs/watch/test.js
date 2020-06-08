var {
  '@kingjs': {
    Path,
    '-fs-file': { Write, Unlink },
    '-rx': { SubscribeAndAssert,
      '-static': { never },
      '-sync': { SubscribeAndAssert: SyncSubscribeAndAssert,
        '-static': { of, throws },
      },
      '-fs': { Watch }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () =>{
  var path = Path.dot
  var fooTxt = path.to('foo.txt')

  of(0)
    [Watch](path)
    [SyncSubscribeAndAssert]([0])

  throws('error')
    [Watch](path)
    [SyncSubscribeAndAssert](null, { error: 'error' })

  var cancel = await never()
    [Watch](path)
    [SubscribeAndAssert](null, { terminate: true })
  cancel()

  process.nextTick(() => fooTxt[Write]())
  var cancel = await never()
    [Watch](path)
    [SubscribeAndAssert]([null], { terminate: true })
  cancel()

  fooTxt[Unlink]()
})