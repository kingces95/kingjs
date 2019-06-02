require('@kingjs/shim')
var assert = require('assert')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var Subject = require('@kingjs/rx.subject')
var ConferenceSubject = require('..')

var confId = 0

var observations = []
var subject = new Subject()
subject
  [Subscribe](o => observations.push(o))

var conference = new ConferenceSubject(
  confId, 
  id => {
    assert(id == confId)
    return subject
  }, 
  o => assert(o == subject)
)

subject[Next]('a')

var result = []
conference
  [Subscribe](
    o => result.push(o),
    () => result.push('.')
  )

subject[Next]('b')
conference[Next]('c')
conference[Complete]()

subject[Next]('d')
assert.deepEqual(observations, ['a','b','c','d'])
assert.deepEqual(result, ['b','c','.'])
