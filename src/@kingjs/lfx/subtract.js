var { 
  '@kingjs': { reflect: { is } },
} = module[require('@kingjs-module/dependencies')]();

/**
 * Copy a an object replacing any numbers with the difference of
 * the existing value and the previous value. 
 * 
 * @param current The object to copy.
 * @param previous The object whose numbers are subtracted from
 * any numbers found in `current`.
*/
function copyAndSubtract(current, previous) {
  return recurse.call({ }, previous, current);

  function recurse(current, previous) {
    for (var name in previous) {
      var currentValue = current[name];
      var previousValue = previous[name];

      // subtract
      if (is.number(currentValue))
        this[name] = currentValue - previousValue;

      // recurse
      else if (is.object(currentValue))
        recurse.call({ }, currentValue, previousValue);

      // copy
      else
        this[name] = currentValue;
    }

    return this;
  }
}

module.exports = copyAndSubtract;