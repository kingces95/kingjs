var { 
  '@kingjs': {
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert,
      '-static': { fromAsync },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await fromAsync(async function *() {
    yield 0; await sleep(1)
    yield 1; await sleep(1)
    yield 2;
  })[SubscribeAndAssert]([0, 1, 2])

  await fromAsync(async function *() {
    throw 'error'
  })[SubscribeAndAssert](null, { error: 'error' })

  var cancel = await fromAsync(async function *() { })
    [SubscribeAndAssert](null, { unfinished: true })
  cancel()

  var cancel = await fromAsync(async function *() {
      while(true) {
        await sleep(1)
        yield 0
      }
    })[SubscribeAndAssert](null, { unfinished: true })
  cancel()

})
