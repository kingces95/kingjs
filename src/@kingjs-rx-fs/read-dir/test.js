var {
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
    IGroupedObservable: { Key },
    Path,
    '-fs': {
      '-dir': { Make, Remove },
      '-file': { Write, Unlink },
    },
    '-rx': { SubscribeAndAssert,
      '-static': { never },
      '-sync': { SubscribeAndAssert, Regroup,
        '-static': { throws },
      },
      '-async': { SelectMany,
        '-static': { of }
      },
      '-fs': { Watch, ReadDir }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var path = Path.dot
  var acme = path.to('acme')
  var fooTxt = acme.to('foo.txt')

  acme[Make]()
  fooTxt[Write]()

  await of(0)
    [ReadDir](acme)
    [Regroup](type =>
      type[Regroup](name => ({ 
        type: type[Key], 
        name: name[Key] 
      }))
    )
    [SelectMany]()
    [Subscribe]({
      [Next](o) {
        console.log(o)
      }
    })

  fooTxt[Unlink]()
  acme[Remove]()

  // of(0)
  //   [Watch](path)
  //   [SyncSubscribeAndAssert]([0])

  // throws('error')
  //   [Watch](path)
  //   [SyncSubscribeAndAssert](null, { error: 'error' })

  // var cancel = await never()
  //   [Watch](path)
  //   [SubscribeAndAssert](null, { terminate: true })
  // cancel()

  // process.nextTick(() => fooTxt[Write]())
  // var cancel = await never()
  //   [Watch](path)
  //   [SubscribeAndAssert]([null], { terminate: true })
  // cancel()

  // fooTxt[Unlink]()
})