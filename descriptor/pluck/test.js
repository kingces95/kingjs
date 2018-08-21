'use strict';

var pluck = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function readMe() {
  var food = {
    banana: 100,
    apple: 50,
    chicken: 20,
    salad: 5
  };
  
  var fruits = {
    banana: undefined,
    apple: undefined,
    orange: undefined
  };
  
  var result = {
    food: pluck.call(food, fruits),
    fruits
  };

  assert(result.food.chicken == 20);
  assert(result.food.salad == 5);

  assert(result.fruits.banana == 100);
  assert(result.fruits.apple == 50);
  assert(result.fruits.orange === undefined);
}
readMe();