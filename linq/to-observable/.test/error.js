require('kingjs')
var ToObservable = require('..');

function* throws() { throw 'my error' }

async function run() {
  var observable = throws[ToObservable](0);

  await new Promise((resolve) => {
    observable.subscribe(null, null, resolve);
  });
}
run();