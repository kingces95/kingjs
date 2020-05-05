var assert = require('assert')
var pollUntil = require('@kingjs-promise/poll-until')

var count = 3
var period = 50
var start = Date.now()

var i = 0
pollUntil(
 () => i++ == count, 
 period,
 null
).then(() => {
  assert(i == count + 1)
  assert(Date.now() - start > period * count)
})

var j = 0
pollUntil(
  () => { 
    j++ 
    return false 
  }, 
  period,
  period * count
).catch(() => {
  assert(j == count)
  assert(Date.now() - start > period * count)
})