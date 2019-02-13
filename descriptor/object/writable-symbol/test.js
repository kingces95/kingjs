'use strict';

var writableSymbol = require('.');

var assert = require('assert');
var is = require('@kingjs/is');

function readMe() {
  assert(is.symbol(writableSymbol));
}
readMe();