require('kingjs')
var OrderByDescending = require('..')
var assert = require('assert')
var ToArray = require('@kingjs/linq.to-array')
var IOrderedEnumerable = require('@kingjs/i-ordered-enumerable')
var { CreateOrderedEnumerable } = IOrderedEnumerable

function readme() {
  var numbers = [1, 0, 2]
  var sortedSequence = numbers[OrderByDescending]()
  var sortedArray = sortedSequence[ToArray]()

  assert(sortedArray[0] == 2)
  assert(sortedArray[1] == 1)
  assert(sortedArray[2] == 0)
}
readme()

function readmeWrapped() {

  var numbers = [{ value: 1 }, { value: 0 }, { value: 2 }]
  var selectValue = function(x) { return x.value }
  var sortedSequence = numbers[OrderByDescending](selectValue)
  var sortedArray = sortedSequence[ToArray]()

  assert(sortedArray[0].value == 2)
  assert(sortedArray[1].value == 1)
  assert(sortedArray[2].value == 0)
}
readmeWrapped()

function readmeComp() {
  var numbers = [1, 0, 2, 'b', 'a']
  var sortedSequence = numbers[OrderByDescending](
    null, 
    function(l, r) {
      if (typeof l != typeof r)
        return typeof l == 'string'
      return l < r
    }
  )
  var sortedArray = sortedSequence[ToArray]()

  assert(sortedArray[4] == 'a')
  assert(sortedArray[3] == 'b')
  assert(sortedArray[2] == 0)
  assert(sortedArray[1] == 1)
  assert(sortedArray[0] == 2)
}
readmeComp()

function readmeThen() {
  var people = [
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ]

  var lastSelector = function(x) { return x.last }
  var firstSelector = function(x) { return x.first }
  var lessThan = null // use default

  var sortedSequence = people
    [OrderByDescending](lastSelector)
    [CreateOrderedEnumerable](firstSelector, lessThan, true)

  var sortedArray = sortedSequence[ToArray]()
  assert(sortedArray[2].last == 'King')
  assert(sortedArray[2].first == 'Chris')
  assert(sortedArray[1].last == 'Smith')
  assert(sortedArray[1].first == 'Alice')
  assert(sortedArray[0].last == 'Smith')
  assert(sortedArray[0].first == 'Bob')
}
readmeThen()
