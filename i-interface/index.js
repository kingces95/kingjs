var {
  ['@kingjs']: {
    reflect: { defineInterface }
  }
} = require('./dependencies');

var { IInterface } = defineInterface;

/**
 * @description IInterface is implemented by functions that are interfaces
 * and has a single member `Id` which returns a symbol identifying
 * the interface.
 */

module.exports = IInterface;