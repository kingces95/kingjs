var { assert,
  '@kingjs': {
    ISubject,
    ISubject: { Next, Complete, Error },
    '-rx': { SubscribeAndAssert,
      '-subject': { Subject },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  var cancelled = false
  var cancel = () => { 
    cancelled = true
  }

  var subject = new Subject(cancel)
  assert(subject instanceof ISubject)
  process.nextTick(() => {
    if (!cancelled) subject[Next](0)
    if (!cancelled) subject[Next](1)
    if (!cancelled) subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0, 1])
  assert.ok(!cancelled)
  
  var subject = new Subject(cancel)
  process.nextTick(() => {
    if (!cancelled) subject[Error]('error')
  })
  await subject[SubscribeAndAssert](null, { error: 'error' })
  assert.ok(!cancelled)

  var subject = new Subject(cancel)
  process.nextTick(() => {
    if (!cancelled) subject[Next](0)
    if (!cancelled) subject[Next](1)
    if (!cancelled) subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0], { terminate: true })
  assert.ok(cancelled)
})