exports['@kingjs'] = {
  fs: {
    rx: {
      watch: require('@kingjs/fs.rx.watch'),
      watchMany: require('@kingjs/fs.rx.watch-many'),
    },
  },
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    Debounce: require('@kingjs/rx.debounce'),
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    Do: require('@kingjs/rx.do'),
    IGroupedObservable: require('@kingjs/rx.i-grouped-observable'),
    IObservable: require('@kingjs/rx.i-observable'),
    Pool: require('@kingjs/rx.pool'),
    Select: require('@kingjs/rx.select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Skip: require('@kingjs/rx.skip'),
    Subject: require('@kingjs/rx.subject'),
    Where: require('@kingjs/rx.where'),
    WindowBy: require('@kingjs/rx.window-by'),
  },
  shim: require('@kingjs/shim'),
}
exports['minimatch'] = require('minimatch')
exports['shelljs'] = require('shelljs')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')