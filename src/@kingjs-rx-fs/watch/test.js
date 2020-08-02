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

  of(0)
    [Watch](path)
    [SyncSubscribeAndAssert]([0])

  throws('error')
    [Watch](path)
    [SyncSubscribeAndAssert](null, { error: 'error' })

  await never()
    [Watch](path)
    [SubscribeAndAssert](null, { terminate: true })

  var fooTxt = path.to('foo.txt')
  process.nextTick(() => foo = path[Write](fooTxt.name))
  await never()
    [Watch](path)
    [SubscribeAndAssert]([null], { terminate: true })

  fooTxt[Unlink]()
})