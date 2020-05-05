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

var collected
singletons[Subscribe](o => collected = o)

var a = singletons.getOrCreate(
  A, id => new MySubject(id)) // ref 0 -> 1
assert(a instanceof MySubject)
assert(a.id == A)

var aAlso = singletons.getOrCreate(
  A, id => new MySubject(id)) // ref 1 -> 2
assert(aAlso == a)

var aComplete = false
a[Subscribe](null, () => aComplete = true)

singletons.release(a) // ref 2 -> 1
assert(!aComplete)

singletons[Next]()
assert(!aComplete)

singletons.release(a) // ref 1 -> 0
assert(!aComplete)

var aAgain = singletons.getOrCreate(
  A, id => new MySubject(id)) // ref 0 -> 1
assert(aAgain == a)

singletons.release(a) // ref 1 -> 0
assert(!aComplete)

assert(!collected)
singletons[Next]() // collect
assert(aComplete)
assert(collected[A] == a)

singletons[Complete]()