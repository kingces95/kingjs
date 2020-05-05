exports['@kingjs'] = {
  exec: require('@kingjs/exec'),
  fs: {
    rx: {
      watchMany: require('@kingjs/fs.rx.watch-many'),
    },
  },
  path: {
    test: require('@kingjs/path.test'),
  },
  reflect: {
    is: require('@kingjs/reflect.is'),
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
exports['osUtils'] = require('os-utils')
exports['rxjs'] = require('rxjs')
exports['uuid'] = require('uuid')
exports['assert'] = require('assert')
exports['crypto'] = require('crypto')
exports['fs'] = require('fs')
exports['http'] = require('http')
exports['os'] = require('os')
exports['path'] = require('path')
exports['readline'] = require('readline')
exports['url'] = require('url')
exports['zlib'] = require('zlib')