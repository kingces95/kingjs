'use strict';

function* odometer(bases) {
  var bases = arguments[0];

  // normalize; ie. odometer(10, 10) => odometer([10, 10])
  if (bases === undefined || typeof bases == 'number')
    bases = arguments;

  if (bases.length == 0)
    return;

  var digits = Array.prototype.map.call(bases, () => 0);
      
  while (true) {
    yield digits.slice();
    if (!increment.call(digits, bases))
      break;
  }
}

function increment(bases) {
  for (var i = 0; i < bases.length; i++) {
    this[i] += 1;
    this[i] %= bases[i];
    if (this[i] != 0)
      return true
  }

  return false;
}

module.exports = odometer;