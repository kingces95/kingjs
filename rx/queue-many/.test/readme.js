require('@kingjs/shim')
var assert = require('assert');
var QueueMany = require('..');
var { Subscribe } = require('@kingjs/rx.i-observable');
var of = require('@kingjs/rx.of');

async function run() {

  result = [];
  await new Promise(resolve => {
    // for each emission select many `IObservable`s
    of({ 
      x: of(0, 2) 
    }, { 
      x: of(1, 3) 
    })
      [QueueMany](async o => await o.x, (o,x) => -x)
      [Subscribe](o => result.push(o), resolve);
  })
  assert.deepEqual(result, [0, -2, -1, -3])

  result = [];
  await new Promise(resolve => {
    //for each emission select many iterables
    of({ 
      x: [0, 2]
    }, { 
      x: [1, 3]
    })
      [QueueMany](async o => await o.x, (o,x) => -x)
      [Subscribe](o => result.push(o));
  })
  assert.deepEqual(result, [0, -2, -1, -3])
}
run()