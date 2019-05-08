# @[kingjs][@kingjs]/[rx][ns0].[tree-subject][ns1]
The Tree Subject.
## Usage
```js
var assert = require('assert')
var TreeSubject = require('@kingjs/rx.tree-subject')
var of = require('@kingjs/rx.of')
var Pipe = require('@kingjs/rx.pipe')
var IObservable = require('@kingjs/rx.i-observable')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete, Error } = require('@kingjs/rx.i-observer')
var { Value } = require('@kingjs/rx.i-published-observable')

var isNode = o => o instanceof TreeSubject
var selectMany = o => o[Value]
var prune = (o, callback) => {
  if (o instanceof IObservable)
    o[Subscribe](null, callback, callback)
}

var a = new TreeSubject()
var e = new TreeSubject()
var b = new TreeSubject(
  o => {
    o[Next](0)
    o[Next](a)
    o[Next](3)
    o[Next](e) 
  }, 
  isNode, selectMany, prune
)

a[Next](1)
a[Next](2)

e[Next](4)

var result = []
b[Subscribe](
  o => result.push(o)
)
assert.deepEqual(result, [0, 1, 2, 3, 4])

a[Complete]()
var result = []
b[Subscribe](
  o => result.push(o)
)
assert.deepEqual(result, [0, 3, 4])

e[Subscribe](null, null, e => null)
e[Error]()
var result = []
b[Subscribe](
  o => result.push(o)
)
assert.deepEqual(result, [0, 3])

```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.tree-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.i-published-observable`](https://www.npmjs.com/package/@kingjs/rx.i-published-observable)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/tree-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/tree-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.tree-subject
