require('@kingjs/shim')
var watchMany = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable')

var watch = watchMany('.');
//var watch = watchMany('../../../..');
watch[Subscribe](
  o => console.log('FILE', o)
);
