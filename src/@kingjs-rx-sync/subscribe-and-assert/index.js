var {
  '@kingjs': {
    IObservable,
    '-rx': { SubscribeAndAssert },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
function subscribeAndAssert(expectedNext, options = { }) {
  return this[SubscribeAndAssert](expectedNext, {
    ...options,
    synchronous: true
  })
}

module[ExportInterfaceExtension](IObservable, subscribeAndAssert)