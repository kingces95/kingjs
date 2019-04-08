var assert = require('assert');
var fs = require('fs');
var ToPromise = require('@kingjs/rx.to-promise');
var watch = require('..');

var fileName = 'temp';

async function run() {
  var observable = watch();
  var promise = observable[ToPromise]();
  fs.writeFileSync(fileName);
  var result = await promise;
  assert(result);
  fs.unlinkSync(fileName);
}
run()
