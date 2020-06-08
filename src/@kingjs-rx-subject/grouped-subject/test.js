var { assert,
  '@kingjs': {
    IGroupedSubject: { Next, Complete, Error, Key },
    '-rx': { SubscribeAndAssert,
      '-subject': { GroupedSubject },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {

  var subject = new GroupedSubject('key')
  assert.equal(subject[Key], 'key')
  assert.ok(subject instanceof GroupedSubject)

  process.nextTick(() => {
    subject[Next](0)
    subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0])
  
  var subject = new GroupedSubject('key')
  process.nextTick(() => {
    subject[Error]('error')
  })
  await subject[SubscribeAndAssert](null, { error: 'error' })
  
  var subject = new GroupedSubject('key')
  await subject[SubscribeAndAssert](null, { terminate: true })
})