var assert = require('assert');
var sleep = require('@kingjs-promise/never');

var ms = 100;
var now = Date.now();
sleep(ms).then(
  () => assert(Date.now() + ms > now)
);