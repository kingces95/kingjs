var orderBy = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var toArray = testRequire('@kingjs/linq.to-array');
var sequence = testRequire('@kingjs/enumerable.create');

function readme() {
  var numbers = sequence(1, 0, 2);
  var sortedSequence = orderBy.call(numbers);
  var sortedArray = toArray.call(sortedSequence);

  assert(sortedArray[0] == 0);
  assert(sortedArray[1] == 1);
  assert(sortedArray[2] == 2);
}
readme();

function readmeWrapped() {

  var numbers = sequence({ value: 1 }, { value: 0 }, { value: 2 });
  var selectValue = function(x) { return x.value; };
  var sortedSequence = orderBy.call(numbers, selectValue);
  var sortedArray = toArray.call(sortedSequence);

  assert(sortedArray[0].value == 0);
  assert(sortedArray[1].value == 1);
  assert(sortedArray[2].value == 2);
}
readmeWrapped();

function readmeComp() {
  var numbers = sequence(1, 0, 2, 'b', 'a');
  var sortedSequence = orderBy.call(
    numbers, 
    null, 
    function(l, r) {
      if (typeof l != typeof r)
        return typeof l == 'string';
      return l < r;
    }
  );
  var sortedArray = toArray.call(sortedSequence);

  assert(sortedArray[0] == 'a');
  assert(sortedArray[1] == 'b');
  assert(sortedArray[2] == 0);
  assert(sortedArray[3] == 1);
  assert(sortedArray[4] == 2);
}
readmeComp();

function readmeDesc() {
  var numbers = sequence(1, 0, 2);
  var sortedSequence = orderBy.call(numbers, null, null, true);
  var sortedArray = toArray.call(sortedSequence);

  assert(sortedArray[0] == 2);
  assert(sortedArray[1] == 1);
  assert(sortedArray[2] == 0);
}
readmeDesc();

function readmeThen() {
  var people = sequence(
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  );

  var lastSelector = function(x) { return x.last; }
  var firstSelector = function(x) { return x.first; }

  var sortedSequence = orderBy
    .call(people, lastSelector)
    .createOrderedEnumerable(firstSelector);

  var sortedArray = toArray.call(sortedSequence);
  assert(sortedArray[0].last == 'King');
  assert(sortedArray[0].first == 'Chris');
  assert(sortedArray[1].last == 'Smith');
  assert(sortedArray[1].first == 'Alice');
  assert(sortedArray[2].last == 'Smith');
  assert(sortedArray[2].first == 'Bob');
}
readmeThen();
