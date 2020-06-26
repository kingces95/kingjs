var { assert,
  '@kingjs': {
    IComparable, 
    IComparable: { CompareTo },
    '-reflect': { is }    
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
  if (is.number(left) || is.string(left) || is.boolean(left))
    return left < right

  assert(left instanceof IComparable)
  return left[CompareTo](right)
}

module.exports = lessThan