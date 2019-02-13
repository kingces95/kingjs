'use strict';

var Dictionary = require(`.`);
var require = require(`..`);
var assert = require(`@kingjs/assert`);
var assertThrows = require(`@kingjs/assert-throws`);

function readme() {
  var dictionary = new Dictionary();
  assert('toString' in dictionary == false);
  assert(Object.keys(dictionary) == 0);

  var object = { };
  assert('toString' in object == true);
  assert(Object.keys(object) == 0);
}
readme();

function trivia() {
  assert({ }.hasOwnProperty('hasOwnProperty'));

  assertThrows(function() { 
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