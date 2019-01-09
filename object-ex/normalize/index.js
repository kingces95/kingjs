'use strict';

var normalize = {
  property: require('./normalize/property'),
  field: require('./normalize/field'),
  function: require('./normalize/function'),
  accessors: require('./normalize/accessors')
};

module.exports = define;
