var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description IInterface has no members. It tags 
 * functions representing interfaces.
 */
module.exports = createInterface('@kingjs/IInterface')