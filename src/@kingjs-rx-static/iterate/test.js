var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-promise': { sleep },
    '-rx': { SubscribeAndAssert,
      '-static': { generate },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  await generate(async function *() {
    yield 0; await sleep(1)
    yield 1; await sleep(1)
    yield 2; await sleep(1)
  })[SubscribeAndAssert]([0, 1, 2])

  await generate(async function *() { throw 'error' })
    [SubscribeAndAssert](null, { error: 'error' })

  await generate(async function *() { })
    [SubscribeAndAssert](null, { abort: true })

  await generate(async function *() { })
    [SubscribeAndAssert](null, { terminate: true })

  await generate(async function *() { yield 0 })
    [SubscribeAndAssert]([0], { terminate: true })

  var cancel = await generate(async function *() { 
      await sleep(1); 
      throw 'error' 
    })[Subscribe](assert.fail, assert.fail, assert.fail)
  cancel()
})