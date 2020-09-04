var { assert,
  '@kingjs': {
    ISubject,
    ISubject: { Next, Complete, Error },
    ICollectibleSubject: { IsEligible },
    '-rx': { SubscribeAndAssert,
      '-subject': { CollectibleSubject },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  var cancelled = false
  var cancel = () => { 
    cancelled = true
  }

  var subject = new CollectibleSubject(cancel, o => o == 2)
  assert(subject instanceof ISubject)
  process.nextTick(() => {
    subject[Next](0)
    assert.ok(!subject[IsEligible])
    subject[Next](1)
    assert.ok(!subject[IsEligible])
    subject[Next](2)
    assert.ok(subject[IsEligible])
    subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0, 1])
  assert.ok(!cancelled)
  
  var subject = new CollectibleSubject(cancel, {
    count: 2,
    isAddRef: o => o == 1,
    isRelease: o => o == 2
  })
  assert(subject instanceof ISubject)
  process.nextTick(() => {
    subject[Next](0)
    assert.ok(!subject[IsEligible])
    subject[Next](1)
    assert.ok(!subject[IsEligible])
    subject[Next](2)
    subject[Next](2)
    subject[Next](2)
    assert.ok(subject[IsEligible])
    subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0])
  assert.ok(!cancelled)

  var subject = new CollectibleSubject(cancel)
  process.nextTick(() => {
    subject[Error]('error')
  })
  await subject[SubscribeAndAssert](null, { error: 'error' })
  assert.ok(!cancelled)

  var subject = new CollectibleSubject(cancel)
  process.nextTick(() => {
    if (!cancelled) subject[Next](0)
    if (!cancelled) subject[Next](1)
    if (!cancelled) subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0], { terminate: true })
  assert.ok(cancelled)
})