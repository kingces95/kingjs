require('kingjs')
var assert = require('assert');
var ToObservable = require('..');

async function run() {
  var interval = 50;
  var count = 3;
  var observable = [0,1,2,3,4,5][ToObservable](interval);

  var i = 0;
  await new Promise((resolve, reject) => {
    var dispose = observable.subscribe(() => i++, reject, reject);

    setTimeout(() => {
      dispose();
      resolve();
    }, interval * count + interval / 2)
  });
  assert(i == count)
}
run();