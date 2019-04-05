var {
  ['@kingjs']: {
    reflect: { createInterface }
  }
} = require('./dependencies');

/**
 * @description `IEventBroadcaster` has a member `emit` that takes
 * the name of the event and an event and broadcasts it to all
 * tuned in listeners.
 */
module.exports = createInterface(
  '@kingjs/IEventBroadcaster', {
    members: { 
      emit: null,
    },
  }
);