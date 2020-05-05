var {
  assert,
  ['@kingjs']: { 
    rx: {
      Subject,
      IObserver: { Next }
    }
  },
} = require('./dependencies')

var Value = 'value'

/**
 * @description A subject that tracks the last value emitted 
 * and exposes it as `Value` and will upon subscription will 
 * replay that value.
 * 
 * @param [value] Optional initial value.
 */
class BehaviorSubject extends Subject {

  constructor(value, activate) {
    super(activate, function onSubscribe(self, next, disposed) {
      assert(self == this)

      if (disposed)
        return

      if (Value in this == false)
        return

      next(this[Value])
    })

    if (arguments.length)
      this[Value] = value
  }

  [Next](value) {
    this[Value] = value
    super[Next](value)
  }
}

module.exports = BehaviorSubject