var { assert,
  '@kingjs': {
    IEquatable, 
    IEquatable: { Equals },
    '-reflect': { isString, isNumber, isBoolean, isBuffer }    
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Compares if one value is equal to another.
 * @param left The left value.
 * @param right The right value.
 * @returns Returns true if left is equal to right.
 * 
 * @remarks By default, uses less than operator on primitives, 
 * and `IComparable.compare` if the values implement `IComparable`.  
 */
function equal(left, right) {
  if (isNumber(left) || isString(left) || isBoolean(left))
    return left === right

  if (isBuffer(left) && isBuffer(right))
    return left.compare(right) == 0

  assert(left instanceof IEquatable)
  return left[Equals](right)
}

module.exports = equal