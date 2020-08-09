var { assert,
  '@kingjs': {
    IComparable, 
    IComparable: { IsLessThan },
    '-reflect': { isNumber, isString, isBoolean, isBuffer }    
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Compares if one value is less than another.
 * @param left The left value.
 * @param right The right value.
 * @returns Returns true if left is less than right.
 * 
 * @remarks By default, uses less than operator on primitives, 
 * and `IComparable.compare` if the values implement `IComparable`.  
 */
function lessThan(left, right) {
  if (isNumber(left) || isString(left) || isBoolean(left))
    return left < right

  if (isBuffer(left) && isBuffer(right))
    return left.compare(right) == -1

  assert(left instanceof IComparable)
  return left[IsLessThan](right)
}

module.exports = lessThan