var {
  ['@kingjs']: {
    rx: { IObservable },
    reflect: { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description `IPublishedObservable` extends `IObservable` and 
 * adds  a single new member `value`.
 */
module.exports = createInterface(
  '@kingjs/rx.IPublishedObservable', {
    members: { value: null },
    extends: IObservable
  }
);