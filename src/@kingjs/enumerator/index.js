var {
  '@kingjs': {
    IEnumerable,
    IEnumerator,
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Implements `IEnumerator` given a factory that, given
 * the container, returns a `moveNext` function.
 * 
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
class Enumerator {
  constructor(createMoveNext) {
    this.createMoveNext = createMoveNext
    this.stillMoving = true
  }

  get [IEnumerator.Current]() { 
    return this.current 
  }

  [IEnumerator.MoveNext]() {
    if (!this.moveNextFunc)
      this.moveNextFunc = this.createMoveNext()

    this.stillMoving = this.stillMoving && this.moveNextFunc.call(this)
    if (!this.stillMoving)
      this.current = undefined

    return this.stillMoving
  }  
}

module.exports = Enumerator