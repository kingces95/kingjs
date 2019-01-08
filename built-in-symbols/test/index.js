'use strict';

var builtInSymbols = require('..');
var assert = require('assert')

function readMe() {
  for (var symbol of Object.getOwnPropertySymbols(builtInSymbols)) {
    var name = builtInSymbols[symbol];
    assert(Symbol[name] === symbol);
  }
}
readMe();