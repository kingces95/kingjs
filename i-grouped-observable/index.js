var {
  ['@kingjs']: {
    IObservable,
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IGroupedObservable` extends `IObservable` and 
 * adds  a single new member `key`.
 */
module.exports = createInterface(
  '@kingjs/IGroupedObservable', {
    members: { key: null },
    extends: IObservable
  }
);