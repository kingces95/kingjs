var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description IInterface.Id is found on functions representing
 * interfaces and stores the symbol identifying the interface.
 */
module.exports = createInterface(
  '@kingjs/IInterface', {
    members: {
      id: null
    }
  }
)