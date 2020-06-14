var { assert,
  '@kingjs': {
    IObserver: { Subscribed, Next, Complete, Error },
    IObservable: { Subscribe },
    '-rx-observer': { create, Check }
  }
} = module[require('@kingjs-module/dependencies')]()

var Noop = () => null

/**
 * @remarks `Subscribe` can only be called once and must be called
 * before the `Subject` emits the `Subscribed` event. In practice,
 * this means the `Subject` must be subscribed synchronously.
 */
class Subject {

  constructor(cancel) {
    assert(cancel)
    this.cancel = cancel
  }

  [Subscribe]() { 
    assert(!this.observer)
    this.observer = create(...arguments)[Check]()

    var { cancel } = this
    this.observer[Subscribed](cancel)
    return cancel
  }

  [Subscribed]() { }
  [Next](o) {
    if (!this.observer)
      return

    this.observer[Next](o)
  }
  [Complete]() {
    if (!this.observer)
      return

    this.observer[Complete]()
  }
  [Error](e) {
    if (!this.observer)
      return

    this.observer[Error](e)
  }
}

module.exports = Subject