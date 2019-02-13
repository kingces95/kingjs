'use strict';

var returnArg1 = require('.');

var assert = require('@kingjs/assert')

function readMe() {
  assert('World!' == returnArg1('Hello', 'World!'));
}
readMe();