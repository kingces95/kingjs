var {
  '@kingjs': {
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert,
      '-async-static': { never },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var cancel = await never()
    [SubscribeAndAssert](null, { unfinished: true })
  await sleep(500)
  cancel()
})