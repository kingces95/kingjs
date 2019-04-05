var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IEventTunable` has a member `on` that takes
 * the name of the event for which to listen and a callback
 * that accepts the event when emitted.
 */
module.exports = createInterface(
  '@kingjs/IEventTunable', {
    members: { 
      on: null,
    },
  }
);