exports['@kingjs'] = {
  fs: {
    rx: {
      watchMany: require('@kingjs/fs.rx.watch-many'),
    },
  },
  rx: {
    Debounce: require('@kingjs/rx.debounce'),
    Do: require('@kingjs/rx.do'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    Pool: require('@kingjs/rx.pool'),
    Select: require('@kingjs/rx.select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Skip: require('@kingjs/rx.skip'),
    Where: require('@kingjs/rx.where'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
  shim: require('@kingjs/shim'),
}
exports['minimatch'] = require('minimatch')
exports['shelljs'] = require('shelljs')
exports['fs'] = require('fs')
exports['path'] = require('path')