var {
  '@kingjs': {
    EmptyObject,
    IObservable,
    '-rx': { 
      '-sync': { MaterializeAndAssert },
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts the sequence of events.
 * @this any The source `IObservable` whose emission are examined.
 */
function materializeAndAssert(expected, options = EmptyObject) {
  return this[MaterializeAndAssert](expected, {
    ...options,
    async: true
  })
}

module[ExportInterfaceExtension](IObservable, materializeAndAssert)