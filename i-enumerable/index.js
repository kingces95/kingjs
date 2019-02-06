var {
  ['@kingjs']: {
    reflect: { defineInterface }
  }
} = require('./dependencies');

/**
 * @description IInterface is implemented by functions that are interfaces
 * and has a single member `Id` which returns a symbol identifying
 * the interface.
 */

defineInterface(kingjs, 'IEnumerable', {
  id: '@kingjs/IEnumerable',
  members: { getEnumerator: null },
}),
module.exports = IInterface;