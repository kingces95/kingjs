'use strict';

var IPolymorphic = require('.');
var testRequire = require('..');
var polymorphismsId = require('@kingjs/polymorphisms');
var assert = testRequire('@kingjs/assert');

var { polymorphisms } = IPolymorphic;

function readMe() {
  assert(polymorphisms == polymorphismsId);
}
readMe();