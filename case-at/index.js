'use strict';

function indexInBounds(value, index) {
  return typeof value == 'string' && index >= 0 && index < value.length;
}

function isRaisedOrLowered(value, index, raise) {
  if (!indexInBounds(value, index))
    return false;

  var actualChar = value.charAt(index);
  var expectedChar = raise ? 
    actualChar.toUpperCase() : actualChar.toLowerCase();

  return actualChar == expectedChar;
}

function raiseOrLower(value, index, raise) {
  if (!indexInBounds(value, index))
    throw "Value '" + value + "' is not a string or has no index '" + index + "'";
    
  var prefix = value.substring(0, index);
  var suffix = value.substring(index + 1, value.length);

  var char = value.charAt(index);
  char = raise ? char.toUpperCase() : char.toLowerCase();

  return prefix + char + suffix;
}

Object.defineProperties(module.exports, {
  isRaised: {
    value: function (value, index) {
      return isRaisedOrLowered(value, index, true);
    }
  },

  isLowered: {
    value: function (value, index) {
      return isRaisedOrLowered(value, index, false);
    }
  },

  raise: {
    value: function(value, index) {
      return raiseOrLower(value, index, true);
    }
  },

  lower: {
    value: function(value, index) {
      return raiseOrLower(value, index, false);
    }
  }
});
