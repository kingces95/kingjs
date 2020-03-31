var assert = require('assert')
var run = require('..')

function pauseAndReturn(value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), Math.random() * Math.floor(100));
  })
}

async function* factory(value) {
  console.log(`produced ${value}`)
  await pauseAndReturn(value)
  yield value
}

async function* producer() {
  for (var i = 0; i < 3; i++)
    yield factory(i)
}

run(producer())