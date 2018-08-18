var groupBy = require('.');
var testRequire = require('..');
var sequence = testRequire('@kingjs/enumerable.create');
var assert = testRequire('@kingjs/assert');
var toArray = testRequire('@kingjs/linq.to-array');

function readme() {
  var evenOdd = groupBy.call(
    sequence(0, 1, 2, 3), 
    function(x) { return x % 2; }
  );
  
  var groups = toArray.call(evenOdd);
  assert(groups.length == 2);

  var evenGroup = groups[0];
  assert(evenGroup.key == 0);

  var evenArray = toArray.call(evenGroup);
  assert(evenArray.length == 2);
  assert(evenArray[0] == 0);
  assert(evenArray[1] == 2);

  var oddGroup = groups[1];
  assert(oddGroup.key == 1);

  var oddArray = toArray.call(oddGroup);
  assert(oddArray.length == 2);
  assert(oddArray[0] == 1);
  assert(oddArray[1] == 3);
}
readme();

function readmePeople() {
  var people = groupBy.call(
    sequence(
      { name: 'Alice', age: 17 },
      { name: 'Bob', age: 16 },
      { name: 'Chris', age: 30 }
    ), 
    function(x) { return x.age <= 18; }, // key selector
    function(x) { return x.name; }, // element selector
    function(group) {  // result selector
      return 'Under 18: ' + group.key + '; ' + 
        toArray.call(group).join(', ');
    },
  );
  
  var result = toArray.call(people);
  assert(result.length == 2);
  assert(result[0] == 'Under 18: true; Alice, Bob');
  assert(result[1] == 'Under 18: false; Chris');
}
readmePeople();

var numbers = sequence( 0, 1, 2, 3 );
var groups = groupBy.call(numbers, function(o) {
   return o % 2;
});

var array = toArray.call(groups);
assert(array.length == 2);
assert(array[0].key == 0);
assert(array[1].key == 1);

var even = toArray.call(array[0]);
assert(even.length == 2);
assert(even[0] == 0);
assert(even[1] == 2);

var odd = toArray.call(array[1]);
assert(odd.length == 2);
assert(odd[0] == 1);
assert(odd[1] == 3);
