var assert = require('assert')
var { Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('..')

var Dir = '.'

var subject = new PathSubject(Dir)
assert(subject.path === Dir)

var result = []
subject[Subscribe](o => result.push(o))
subject[Complete]()
assert.deepEqual(result, [ ])