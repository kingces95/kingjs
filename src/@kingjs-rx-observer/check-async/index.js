var {
  '@kingjs': { IObserver,
    '-rx-observer': { Check },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asserts an observers calls are orderly and that no
 * calls are made after subscribe on the same pass of the event loop.
 * @this any The `IObserver`.
 * @returns Returns a proxy `IObserver` which intercepts and asserts
 * that the calls to the original `IObserver` are orderly.
 * 
 * @remarks Calls like `Take` "self-complete" their `IObservable`. To 
 * to that, they must have access to the cancel function. The cancel 
 * function is only available after the call to `Subscribe` returns. 
 * Therefore, such calls must assert that the `Subscribe` function does 
 * not place calls to the `IObserver` before `Subscribe` returns the 
 * cancel function. 
 */
function checkAsync() {
  return this[Check]({ checkAsync: true })
}

module[ExportExtension](IObserver, checkAsync)
