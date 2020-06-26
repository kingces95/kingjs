var {
  '@kingjs': {
    Path,
    '-fs': { Stat: StatFs,
      '-file': { Write, Unlink },
    },
    '-rx': { 
      '-sync': { SubscribeAndAssert,
        '-static': { of, throws },
      },
      '-fs': { Stat }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var bar = Path.dot.to('bar.txt')
bar[Write]()
var stat = bar[StatFs]()
var expected = { value: 0, stat }

of(0)
  [Stat](bar)
  [SubscribeAndAssert]([expected])

of(0)
  [Stat](bar)
  [SubscribeAndAssert]([expected], { terminate: true })

throws('error')
  [Stat](bar)
  [SubscribeAndAssert](null, { error: 'error' })

bar[Unlink]()