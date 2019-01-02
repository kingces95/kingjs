'use strict';

var IIdentifiable = require('.');
var testRequire = require('..');
var identityId = require('@kingjs/identity');
var assert = testRequire('@kingjs/assert');

var { identity } = IIdentifiable;

function readMe() {
  assert(identity == identityId);
}
readMe();