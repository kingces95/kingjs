var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    },
    rx: { 
      Zip,
      IObservable,
    },
  }
} = module[require('@kingjs-module/dependencies')]();

var zipper = (l, r) => r;

/**
 * @description Create an `IObservable` that emits a single value.
 * 
 * @this any The `IObservable` whose next emission is replaced with `value`.
 * 
 * @param value The value emit.
 * 
 * @returns Returns an observable that emits a single value, completes,
 * and then disposes itself. 
 */
function once(value) {
  return this[Zip](value, zipper);
}

exportExtension(module, IObservable, once);
