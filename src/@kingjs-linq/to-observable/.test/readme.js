require('kingjs')
var assert = require('assert');
var ToObservable = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');

async function run() {
  var interval = 50;
  var result = [];
  var observable = [0, 1, 2][ToObservable](interval);

  var start = Date.now();
  await new Promise((resolve, reject) => {
    observable[Subscribe](
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