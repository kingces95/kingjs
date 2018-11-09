'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var ex = exports;

objectEx.defineFunctions(ex, {
  isLowerCase: function(value, index) {
    if (!is.string(value) || index >= value.length)
      return false;
    
    return value.charAt(index).toLowerCase() == value[index];
  },

  isUpperCase: function(value, index) {
    if (!is.string(value) || index >= value.length)
      return false;
    
    return value.charAt(index).toUpperCase() == value[index];
  },

  isCapitalized: function(value) {
    return ex.isUpperCase(value, 0);
  },

  capitalize: function(value) {    
    if (ex.isCapitalized(value))
      return value;
    
    return value.charAt(0).toUpperCase() + value.substring(1, value.length);
  },

  decapitalize: function(value) {
    if (!ex.isCapitalized(value))
      return value;
    
    return value.charAt(0).toLowerCase() + value.substring(1, value.length);
  },  
});