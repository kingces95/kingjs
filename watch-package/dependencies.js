exports['@kingjs'] = {
  fs: {
    //watch: require('@kingjs/fs.watch'),
  },
  IGroupedObservable: require('@kingjs/i-grouped-observable'),
  IObservable: require('@kingjs/i-observable'),
  IObserver: require('@kingjs/i-observer'),
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    create: require('@kingjs/rx.create'),
    DebounceTime: require('@kingjs/rx.debounce-time'),
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    GroupBy: require('@kingjs/rx.group-by'),
    of: require('@kingjs/rx.of'),
    SelectMany: require('@kingjs/rx.select-many'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['chokidar'] = require('chokidar')
exports['deepEquals'] = require('deep-equals')
exports['rxjs'] = require('rxjs')
exports['shelljs'] = require('shelljs')
exports['assert'] = require('assert')
exports['fs'] = require('fs')
exports['path'] = require('path')