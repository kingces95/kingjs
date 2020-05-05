'use strict';

var Dictionary = require(`.`);
var require = require(`..`);
var assert = require(`assert`);

var dictionary = new Dictionary();
assert('toString' in dictionary == false);
assert(Object.keys(dictionary) == 0);

var object = { };
assert('toString' in object == true);
assert(Object.keys(object) == 0);
