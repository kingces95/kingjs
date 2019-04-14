require('@kingjs/shim')
var watchMany = require('..');

var watch = watchMany('.');
//var watch = watchMany('../../../..');
watch[Subscribe](o => console.log('FILE', o));
