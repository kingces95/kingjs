var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IEventDetunable` has a member `off` that takes
 * the name of the event for which to stop listening and a member
 * `listenerCount` which takes the name of an event and returns
 * the number of listeners.
 */
module.exports = createInterface(
  '@kingjs/IEventDetunable', {
    members: { 
      off: null,
      listenerCount: null
    },
  }
);