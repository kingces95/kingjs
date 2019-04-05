var {
  events: { EventEmitter },
  ['@kingjs']: { 
    reflect: { implementInterface },
    IEventTunable,
    IEventTunable: { on },
    IEventDetunable,
    IEventDetunable: { off, listenerCount },
    IEventBroadcaster,
    IEventBroadcaster: { emit },
  },
} = require('./dependencies');

implementInterface(EventEmitter.prototype, IEventTunable, {
  on(name, listener) { if (listener) this.on(name, listener); }
});

implementInterface(EventEmitter.prototype, IEventDetunable, {
  off(name, listener) { if (listener) this.off(name, listener); },
  listenerCount(name) { return this.listenerCount(name); }
});

implementInterface(EventEmitter.prototype, IEventBroadcaster, {
  emit(name, event) { this.emit(name, event); }
});