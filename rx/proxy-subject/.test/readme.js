var assert = require('assert')
var ProxySubject = require('..')
var Subject = require('@kingjs/rx.subject')
var Select = require('@kingjs/rx.select')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete, Error } = require('@kingjs/rx.i-observer')

// select
var proxy = new ProxySubject(
  () => new Subject(),
  o => o[Select](x => x + 1)
)

// subscribe
var result = []
proxy[Subscribe](
  o => result.push(o),
  () => result.push('COMPLETE')
)

// execute
proxy[Next](0)
proxy[Complete]()
assert.deepEqual(result, [
  1, 'COMPLETE'
])

// error
var proxy = new ProxySubject()
var result = []
proxy[Subscribe](null, null, e => result.push(e))
proxy[Error]('ERROR')
assert(result[0] == 'ERROR')

// dispose
var proxy = new ProxySubject()
var result = []
var dispose = proxy[Subscribe]()
dispose()
proxy[Subscribe](null, null, e => result.push(e))
assert(result.length == 1)