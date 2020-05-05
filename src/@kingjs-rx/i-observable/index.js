var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description `IObservable` has a single member `subscribe`.
 */
module.exports = createInterface(
  '@kingjs/rx.IObservable', {
    members: { subscribe: null },
  }
);