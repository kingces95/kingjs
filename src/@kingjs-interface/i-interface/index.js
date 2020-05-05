var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description IInterface has no members. It tags 
 * functions representing interfaces.
 */
module.exports = createInterface('@kingjs/IInterface')