var { 
  ['@kingjs']: {
    rx: { from },
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Create an `IObservable` from `arguments`.
 * 
 * @returns Returns `IObservable` that emits elements `arguments`.
 * 
 * @remarks All values are emitted synchronously. As such, this is primarily
 * a toy or testing tool with limited practical use.
 */
function of() {
  return from([...arguments]);
}

module.exports = of;