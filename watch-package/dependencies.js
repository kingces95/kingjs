exports['@kingjs'] = {
  IObservable: require('@kingjs/i-observable'),
  reflect: {
    is: require('@kingjs/reflect.is'),
  },
  rx: {
    Blend: require('@kingjs/rx.blend'),
    create: require('@kingjs/rx.create'),
    DebounceTime: require('@kingjs/rx.debounce-time'),
    GroupBy: require('@kingjs/rx.group-by'),
    SelectMany: require('@kingjs/rx.select-many'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['chokidar'] = require('chokidar')
exports['deepEquals'] = require('deep-equals')
exports['rxjs'] = require('rxjs')
exports['shelljs'] = require('shelljs')