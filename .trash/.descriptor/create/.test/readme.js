var create = require('..');
var assert = require('assert');

var people = {
  alice: { name: 'Alice', age: 21 },
  bob: 'Bob'
}

for (var name in people)
  people[name] = create(people[name], { wrap: 'name' });

assert(Object.isFrozen(people.alice));
assert(Object.isFrozen(people.bob));

assert(people.alice.name == 'Alice');
assert(people.bob.name == 'Bob');