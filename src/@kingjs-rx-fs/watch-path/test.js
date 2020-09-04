var {
  '@kingjs': {
    Path,
    '-fs-file': { Overwrite, Unlink },
    '-rx': { SubscribeAndAssert,
      '-static': { never },
      '-sync': { SubscribeAndAssert: SyncSubscribeAndAssert,
        '-static': { of, throws },
      },
      '-fs': { WatchPath }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () =>{
  var path = Path.dot

  await of(0)
    [WatchPath](path)
    [SyncSubscribeAndAssert]([0])

  await throws('error')
    [WatchPath](path)
    [SyncSubscribeAndAssert](null, { error: 'error' })

  await never()
    [WatchPath](path)
    [SubscribeAndAssert](null, { terminate: true })

  var fooTxt = path.to('foo.txt')
  process.nextTick(() => fooTxt[Overwrite]())
  await never()
    [WatchPath](path)
    [SubscribeAndAssert]([null], { terminate: true })

  fooTxt[Unlink]()
})