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
      var checkedObserver = observer[Check]()
      var cancelled = false

      process.nextTick(async () => {
        if (cancelled)
          return

        for (var _ of generator(checkedObserver)) {
          await tick()
          if (cancelled)
            return
        }
      })

      return () => cancelled = true
    }
  }
}

module.exports = create