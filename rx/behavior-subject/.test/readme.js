var assert = require('assert')
var BehaviorSubject = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete, Error } = require('@kingjs/rx.i-observer')

var result = []
var subject = new BehaviorSubject()
subject[Subscribe](o => result.push(o))
subject[Next](0)
subject[Subscribe](o => result.push(o))
subject[Complete]()
subject[Subscribe](o => result.push(o))
assert.deepEqual(result, [0, 0, 0])

var result = []
var subject = new BehaviorSubject(1)
subject[Subscribe](o => result.push(o))
subject[Complete]()
subject[Subscribe](o => result.push(o))
assert.deepEqual(result, [1])