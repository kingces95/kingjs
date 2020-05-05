var {
  ['@kingjs']: {
    IEnumerable,
    IEnumerator,
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Implements `IEnumerable` given a factory that, given
 * the container, returns a `moveNext` function.
 * 
 * @param target The instance on which to implement `IEnumerable`.
 * @param createMoveNext A factory that, given the container, returns
 * a `moveNext` function. `moveNext` should return `true` if more 
 * elements remain; otherwise `false`.
 * 
 * @returns `target`
 * 
 * @callback createMoveNext
 * @param this The enumerator. When a new value is generate it should
 * be stored in `this.current_`. 
 * @param instance The instance to enumerate.
 */
function implementIEnumerable(target, createMoveNext) {
  target[IEnumerable.getEnumerator] = function getEnumerator() { 
    return new Enumerator(this, createMoveNext); 
  };

  return target;
}

class Enumerator {
  constructor(instance, createMoveNext) {
    this.instance = instance;
    this.createMoveNext = createMoveNext;
    this.stillMoving = true;
  }

  get [IEnumerator.current]() { 
    return this.current_; 
  }

  [IEnumerator.moveNext]() {
    if (!this.moveNextFunc)
      this.moveNextFunc = this.createMoveNext(this.instance);

    this.stillMoving = this.stillMoving && this.moveNextFunc.call(this);
    if (!this.stillMoving)
      this.current_ = undefined;

    return this.stillMoving;
  }  
}

module.exports = implementIEnumerable;