module.exports = {
  '@kingjs-reflect': {
    exportExtension: require('@kingjs-reflect/export-extension'),
  },
  '@kingjs-rx': {
    create: require('@kingjs-rx/create'),
  },
  '@kingjs-interface': {
    IObservable: require('@kingjs-rx/i-observable'),
    IObserver: require('@kingjs-rx/i-observer'),
  },
}
exports['assert'] = require('assert')