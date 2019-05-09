var assert = require('assert');
var Subject = require('..');

var s = new Subject()
for (var o of Object.keys(s))
  console.log(o)