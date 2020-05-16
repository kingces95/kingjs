var assert = require('assert')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var Subject = require('@kingjs/rx.subject')
var Singletons = require('..')

var A = 'a'

class MySubject extends Subject {
  constructor(id) {
    super()
    this.id = id
  }
}

var singletons = new Singletons()

var a = singletons.getOrCreate(A, id => new MySubject(id))
assert(a instanceof MySubject)
assert(a.id == A)

var completed

var unsubscribe = a[Subscribe](null, () => completed = true)
assert(!completed)
// if singletons didn't subscribe, this completes the subject
unsubscribe() 

// in which case re-subscribing would generate the complete event
var unsubscribe = a[Subscribe](null, () => completed = true)

// and completed would be true. We expect false
assert(!completed)
unsubscribe()

// after collection, the subject is completed
singletons.release(a)
singletons[Next]() // collect

// and so we expect re-subscribe to generate a complete event
var unsubscribe = a[Subscribe](null, () => completed = true)
unsubscribe()
assert(completed)

singletons[Complete]()