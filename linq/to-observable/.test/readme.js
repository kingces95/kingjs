require('kingjs')
var assert = require('assert');
var ToObservable = require('..');

async function run() {
  var interval = 50;
  var result = [];
  var observable = [0, 1, 2][ToObservable](interval);

  var start = Date.now();
  await new Promise((resolve, reject) => {
    observable.subscribe(
      o => { 
        result.push(o);

        var end = Date.now();
        assert(end - start >= interval);
        start = end;
      },
      resolve,
      reject
    );
  });

  assert.deepEqual(result, [0, 1, 2]);
}
run();