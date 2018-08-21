'use strict';

var map = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')

function defaults() {
  var result = map.call({
    $defaults: {
      familyOverrideAction: 'Family',
      descriptorOverrideFamily: 'Family',
      family: 'Family',
    },
    descriptor: {
      descriptorOverrideAction: 'Descriptor',
      descriptorOverrideFamily: 'Descriptor',
      descriptor: 'Descriptor'
    },
  }, {
    $defaults: {
      action: 'Action',
      familyOverrideAction: 'Action', 
      descriptorOverrideAction: 'Action' 
    },
    callback: function(x) { 
      return x;
    }
  });

  assert(result.descriptor.action == 'Action');
  assert(result.descriptor.family == 'Family');
  assert(result.descriptor.familyOverrideAction == 'Family');
  assert(result.descriptor.descriptor == 'Descriptor');
  assert(result.descriptor.descriptorOverrideFamily == 'Descriptor');
  assert(result.descriptor.descriptorOverrideAction == 'Descriptor');
}
defaults();