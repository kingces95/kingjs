var {
  '@kingjs': { 
    IEquatable: { Equals, GetHashcode }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Base class for singleton.
 * @remarks Implements `IEquatable`.
 * @remarks Hashcode is randomly assigned a non-zero number.
 */
class Singleton {

  [Equals](other) { 
    return this == other 
  }

  [GetHashcode]() {
    while (!this._hashcode)
      Object.defineProperty(this, '_hashcode', { value: Math.random() })
    return this._hashcode
  }
}

module.exports = Singleton