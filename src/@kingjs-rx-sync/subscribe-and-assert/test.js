var {
  '@kingjs': {
    IObserver: { Next, Complete, Error },
    '-rx': {
      '-subject': { Subject },
      '-sync': { SubscribeAndAssert, Materialize,
        '-static': { of, throws, never }
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

of()
  [SubscribeAndAssert]()

of(0)
  [SubscribeAndAssert]([0])


of(0, 1)
  [SubscribeAndAssert]([0, 1])

of(0, 1)
  [SubscribeAndAssert]([0], { terminate: true })

throws('error')
  [SubscribeAndAssert](null, { error: 'error' })

never()
  [SubscribeAndAssert](null, { abandon: true })

var subject = new Subject()
subject
  [Materialize]()
  [SubscribeAndAssert]([
    () => {
      subject[Next](0)
      subject[Next](1)
    },
    { next: true, value: 0 },
    { next: true, value: 1 },

    () => subject[Next](2),
    { next: true, value: 2 },

    () => subject[Complete](),
    { complete: true }
  ], { log: true })