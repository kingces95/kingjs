require('@kingjs/shim')
var watchMany = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable')
var Log = require('@kingjs/rx.log')
var Where = require('@kingjs/rx.where')

var watch = watchMany('.');
//var watch = watchMany('../../../..');
// watch[Subscribe](
//   o => console.log('FILE', o)
// );

watch
  [Log]('MOTION', '${event} ${name}')
  [Subscribe]();

  