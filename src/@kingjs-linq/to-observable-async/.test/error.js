require('kingjs')
var ToObservable = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');

function* throws() { throw 'my error' }

async function run() {
  var observable = throws[ToObservable](0);

  await new Promise((resolve) => {
    observable[Subscribe](null, null, resolve);
  });
}
run();