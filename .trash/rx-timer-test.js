var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-linq': { ToObservable },
    '-array': { ImplementIEnumerable },
  }
} = module[require('@kingjs-module/dependencies')]()

Array[ImplementIEnumerable]()

async function run() {
  var interval = 50
  var result = []
  var observable = [0, 1, 2][ToObservable](interval)

  var start = Date.now()
  await new Promise((resolve, reject) => {
    observable[Subscribe](
      o => { 
        result.push(o)

        var end = Date.now()
        assert(end - start >= interval)
        start = end
      },
      resolve,
      reject
    )
  })

  assert.deepEqual(result, [0, 1, 2])
}
run()

function* throws() { throw 'my error' }

async function run() {
  var observable = throws[ToObservable](0)

  await new Promise((resolve) => {
    observable[Subscribe](null, null, resolve)
  })
}
run()

async function run() {
  var interval = 50
  var count = 3
  var observable = [0, 1, 2, 3, 4, 5][ToObservable](interval)

  var i = 0
  await new Promise((resolve, reject) => {
    var dispose = observable[Subscribe](() => i++, reject, reject)

    setTimeout(() => {
      dispose()
      resolve()
    }, interval * count + interval / 2)
  })
  assert(i == count)
}
run()