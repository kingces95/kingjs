var assert = require('assert');
var sleep = require('@kingjs-promise/sleep');

var ms = 100;
var now = Date.now();
sleep(ms).then(
  () => assert(Date.now() + ms > now)
);