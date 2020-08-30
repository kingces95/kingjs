var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert,
      '-static': { iterate },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await iterate((async function *() {
    yield 0; await sleep(1)
    yield 1; await sleep(1)
    yield 2; await sleep(1)
  })())[SubscribeAndAssert]([0, 1, 2])

  await iterate((async function *() { throw 'error' })())
    [SubscribeAndAssert](null, { error: 'error' })

  await iterate((async function *() { })())
    [SubscribeAndAssert](null, { abort: true })

  await iterate((async function *() { })())
    [SubscribeAndAssert](null, { terminate: true })

  await iterate((async function *() { yield 0 })())
    [SubscribeAndAssert]([0], { terminate: true })

  var cancel = await iterate((async function *() { 
      await sleep(1); 
      throw 'error' 
    })())[Subscribe](assert.fail, assert.fail, assert.fail)
  cancel()
})