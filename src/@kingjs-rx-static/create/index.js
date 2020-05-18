var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Next, Complete, Error },
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyObject = { }
var Noop = () => undefined
var ThrowNextTick = o => process.nextTick(() => { throw o })

/**
 * @description Returns an object that implements `IObservable` using
 * the provided `subscribe` callback. 
 * 
 * @param {*} subscribe The subscribe implementation.
 * 
 * @callback subscribe
 * @param observer A pojo with properties `Next`, `Complete`, 
 * and/or `Error`.
 * 
 * @remarks Defaults are provided for missing `Next`, `Complete`, 
 * and/or `Error` handlers.
 */
function create(subscribe) {
  assert(subscribe)

  return {
    [Subscribe](observer = EmptyObject) {
      assert(observer)

      // overload
      if (observer instanceof Function) {
        observer = {
          [Next]: arguments[0],
          [Complete]: arguments[1],
          [Error]: arguments[2],
        } 
      }

      // defaults
      var {
        [Next]: next = Noop,
        [Complete]: complete = Noop,
        [Error]: error = ThrowNextTick
      } = observer

      // checks
      var finished = false
      var checkedObserver = {
        [Next]: o => { 
          assert.ok(!finished) 
          next(o)
        },
        [Complete]: () => {
          assert.ok(!finished) 
          complete()
          finished = true
        },
        [Error]: e => {
          assert.ok(!finished) 
          error(e)
          finished = true
        }
      }

      return subscribe(checkedObserver) || Noop
    }
  }
}

function select(transform) {
  var observable = this
  return create(observer => {
    return observable[Subscribe]({
      ...observer,
      [Next](o) { 
        observer[Next](transform(o))
      },
    })
  })
}

function where(predicate) {
  var observable = this
  return create(observer => {
    return observable[Subscribe]({
      ...observer,
      [Next](o) { 
        if (!predicate(o))
          return
        observer[Next](o)
      },
    })
  })
}

function from(array) {
  return create(observer => {
    for (var o of array)
      observer[Next](o)
    observer[Complete]()

    return () => console.log('disposed')
  })
}

function empty() {
  return create(observer => {
    observer[Complete]()
    return () => null
  })
}

function returns(value) {
  return create(observer => {
    observer[Next](value)
    observer[Complete]()
    return () => null
  })
}

// empty()[Subscribe]({
//   [Complete]() { console.log('complete') }
// })

// singleton(42)[Subscribe]({
//   [Next](o) { console.log(`next ${o}`) },
//   [Complete]() { console.log('complete') }
// })

// var o = from([0,1,2,3])
// o = where.call(o, x => x % 2 == 0)
// o[Subscribe]({
//   [Next](o) { console.log(`next ${o}`) },
//   [Complete]() { console.log('complete') }
// })

module.exports = create