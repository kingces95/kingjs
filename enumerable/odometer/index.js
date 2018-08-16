'use strict';

var writable = { writable: true };

var notNormalNumber = function(n) { 
  return n > 0 == false; 
}

function Odometer(bases) {

  // normalize
  var normalizedBases = bases;
  if (bases === undefined || typeof bases == 'number')
    normalizedBases = arguments;

  // preconditions
  var findIndex = Array.prototype.findIndex;
  var badIndex = findIndex.call(normalizedBases, notNormalNumber);
  if (badIndex != -1) {
    var badValue = normalizedBases[badIndex];
    throw('Odometer: ∃x ∈ bases: x <= 0, bases[' + badIndex + '] => ' + badValue);
  }

  // hide
  Object.defineProperties(this, {
    bases_: { value: normalizedBases },
  });
};

Object.defineProperties(Odometer.prototype, {
  getEnumerator: {
    value: function() {
      return new Enumerator(this.bases_);
    }
  }
});

function Enumerator(bases) {
  Object.defineProperties(this, {
    bases_: { value: bases },
    digits_: writable,
    current_: writable
  });
};

Object.defineProperties(Enumerator.prototype, {
  current: {
    enumerable: true,
    get: function () { return this.current_; }
  },

  moveNext: {
    value: function() {
      var bases = this.bases_;
      if (bases.length == 0)
        return false;

      var digits = this.digits_;
      if (!digits) {
        digits = [];
        for (var i = 0; i < bases.length; i++)
          digits.push(0);

        this.digits_ = digits;
        this.current_ = digits.slice();
        return true;
      }

      for (var i = 0; i < bases.length; i++) {
        digits[i] += 1;
        digits[i] %= bases[i];
        if (digits[i] == 0)
          continue;

        this.current_ = digits.slice();
        return true;
      }

      return false;
    }
  }
});

Object.defineProperties(module, {
  exports: { value: Odometer }
});