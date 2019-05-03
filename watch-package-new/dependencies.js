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
    GroupBy: require('@kingjs/rx.group-by'),
    IObservable: require('@kingjs/rx.i-observable'),
    Select: require('@kingjs/rx.select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Spy: require('@kingjs/rx.spy'),
    Where: require('@kingjs/rx.where'),
  },
  shim: require('@kingjs/shim'),
}
exports['deepEquals'] = require('deep-equals')
exports['npmPacklist'] = require('npm-packlist')
exports['rxjs'] = require('rxjs')
exports['shelljs'] = require('shelljs')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')