var {
  '@kingjs': {
    Path,
    '-fs': {
      '-leaf': { Unlink },
      '-dir': { Write },
    },
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

  var fooTxt = null
  process.nextTick(() => fooTxt = path[Write]('foo.txt'))
  await never()
    [WatchPath](path)
    [SubscribeAndAssert]([null], { terminate: true })

  fooTxt[Unlink]()
})