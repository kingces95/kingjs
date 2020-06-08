var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-promise': { tick },
    '-rx-observer': { create: createObserver, Check },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Creates a stream of asynchronous events. 
 * @param {*} generator The subscribe implementation.
 * 
 * @callback subscribe
 * @param observer A pojo with properties `Next`, `Complete`, 
 * and/or `Error`. Defaults are provided for missing handlers.
 * 
 * @remarks Each yield will await the next iteration of the
 * event loop before returning control to the generator.
 */
function create(generator) {
  assert(generator)

  return {
    [Subscribe]() {
      var observer = createObserver(...arguments)      
      observer = observer[Check]()

      var cancelled = false
      var cancel = () => cancelled = true

      process.nextTick(async () => {
        if (cancelled)
          return

        for (var _ of generator(observer, cancel)) {
          await tick()
          if (cancelled)
            return
        }
      })

      return cancel
    }
  }
}

module.exports = create