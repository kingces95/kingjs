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
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    Do: require('@kingjs/rx.do'),
    IObservable: require('@kingjs/rx.i-observable'),
    Pool: require('@kingjs/rx.pool'),
    SelectMany: require('@kingjs/rx.select-many'),
    Where: require('@kingjs/rx.where'),
  },
  shim: require('@kingjs/shim'),
}
exports['minimatch'] = require('minimatch')
exports['rxjs'] = require('rxjs')
exports['shelljs'] = require('shelljs')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')