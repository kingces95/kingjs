var {
  '@kingjs': {
    '-rx': { SubscribeAndAssert, 
      '-sync': { GroupBy },
      '-async': { Disband,
        '-static': { of },
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await of('a0', 'a1', 'b0', 'c0')
    [GroupBy](o => o[0])
    [Disband]((o, key) => `${key}.${o}`)
    [SubscribeAndAssert](['a.a0', 'a.a1', 'b.b0', 'c.c0'])

  await of('a0', 'a1', 'b0', 'c0')
    [GroupBy](o => o[0])
    [Disband]()
    [SubscribeAndAssert](['a0', 'a1', 'b0', 'c0'])
  
})
