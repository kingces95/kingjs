'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function refs() {
  var result = map.call({
    apple: { type: 'fruit' },
    orange: { type: 'fruit'  },
    fruit: { name: 'fruit' }
  }, {
    $refs: '*.type',
    callback: function(x) { 
      return x;
    }
  });

  assert(result.apple.type == result.fruit);
  assert(result.orange.type == result.fruit);
  assert(result.fruit.name == 'fruit');
}
refs();