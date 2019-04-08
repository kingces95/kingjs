require('@kingjs/shim')
var assert = require('assert');
var { Subscribe } = require('@kingjs/rx.i-observable');
var timer = require('@kingjs/rx.timer');
var of = require('@kingjs/rx.of');
var Then = require('..');

async function run() {
  var result = [];

  // timer + Then = an asynchronous multicast operator
  var four = timer()
    [Then](of(0, 1))
    [Then](of(2, 3));
  
  await Promise.all([
    new Promise(resolve => 
      four[Subscribe](
        o => result.push(o),
        resolve
      )
    ),
    new Promise(resolve => 
      four[Subscribe](
        o => result.push(o),
        resolve
      )
    )
  ])
    
  assert.deepEqual(result, [0, 0, 1, 1, 2, 2, 3, 3])
}
run();