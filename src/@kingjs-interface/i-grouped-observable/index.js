var {
  '@kingjs': {
    '-rx': { IObservable },
    '-reflect': { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description `IGroupedObservable` extends `IObservable` and 
 * adds  a single new member `key`.
 */
module.exports = createInterface(
  '@kingjs/rx.IGroupedObservable', {
    members: { key: null },
    extends: IObservable
  }
);