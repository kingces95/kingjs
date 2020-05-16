var {
  '@kingjs': {
    IEnumerable,
    IEnumerator,
    Enumerator
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Implements `IEnumerable` given a factory that, given
 * the container, returns a `moveNext` function.
 * 
 * @param target The instance on which to implement `IEnumerable`.
 * @param createMoveNext A factory that, given the container, returns
 * a `moveNext` function. `moveNext` should return `true` if more 
 * elements remain otherwise `false`.
 * 
 * @returns `target`
 * 
 * @callback createMoveNext
 * @param this The enumerator. When a new value is generate it should
 * be stored in `this.current`. 
 * @param instance The instance to enumerate.
 */
class Enumerable {
  constructor(createMoveNext) {
    this.createMoveNext = createMoveNext
  }

  [IEnumerable.GetEnumerator]() { 
    return new Enumerator(
      this.createMoveNext
    ) 
  }
}

module.exports = Enumerable