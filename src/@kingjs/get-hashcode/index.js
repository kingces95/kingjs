var { assert,
  '@kingjs': {
    IEquatable, 
    IEquatable: { GetHashcode },
    '-string': { GetHashcode: GetStringHashcode },
    '-buffer': { GetHashcode: GetBufferHashcode },
    '-reflect': { isString, isNumber, isBoolean, isBuffer }    
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Get the hashcode of a number, boolean, string, or object
 * that implements IEquatable.
 * @param value The value.
 * @returns Returns the hashcode.
 */
function getHashcode(value) {
  if (isNumber(value))
    return value

  if (isBoolean(value))
    return value ? 1 : 0

  if (isString(value))
    return value[GetStringHashcode]()

  if (isBuffer(value))
    return value[GetBufferHashcode]()
  
  assert(value instanceof IEquatable)
  return value[GetHashcode]()
}

module.exports = getHashcode