var { assert,
  '@kingjs': {
    '-rx': {
      '-sync': { Log, Then, SubscribeAndAssert,
        '-static': { of, throws, never },
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var Label = 'Test'

var result = []
of(0, 1, 2)
  [Log](Label, { writeLine: o => result.push(o) })
  [SubscribeAndAssert]([0, 1, 2])
assert.deepEqual(result, [ 'Test: 0', 'Test: 1', 'Test: 2', 'Test: COMPLETE' ])

var result = []
throws('error')
  [Log](Label, { writeLine: o => result.push(o) })
  [SubscribeAndAssert](null, { error: 'error' })
assert.deepEqual(result, [ 'Test: ERROR' ])

never()
  [Log]()
  [SubscribeAndAssert](null, { terminate: true })
