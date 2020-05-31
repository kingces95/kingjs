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

  var subject = new Subject()
  assert(subject instanceof ISubject)

  process.nextTick(() => {
    subject[Next](0)
    subject[Complete]()
  })
  await subject[SubscribeAndAssert]([0])
  
  var subject = new Subject()
  process.nextTick(() => {
    subject[Error]('error')
  })
  await subject[SubscribeAndAssert](null, { error: 'error' })
  
  var subject = new Subject()
  await subject[SubscribeAndAssert](null, { unfinished: true })
})