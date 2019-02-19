require('./readme.js')

var Dictionary = require(`.`);
var require = require(`..`);
var assert = require(`assert`);

function trivia() {
  assert({ }.hasOwnProperty('hasOwnProperty'));

  assert.throws(function() { 
    new Dictionary().hasOwnProperty('hasOwnProperty'); 
  });

  var objectPrototype = Object.prototype;
  var dictionary = new Dictionary();
  dictionary.x = 0;
  assert(objectPrototype.hasOwnProperty.call(dictionary, 'x'));

  var inherited = Object.create(dictionary);
  assert('x' in inherited);
  assert(objectPrototype.hasOwnProperty.call(inherited, 'x') == false);
}
trivia()