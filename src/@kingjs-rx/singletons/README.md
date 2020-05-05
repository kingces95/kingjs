# @[kingjs][@kingjs]/[rx][ns0].[singletons][ns1]
A subject factory which is also a subject.
## Usage
```js
var assert = require('assert')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var Subject = require('@kingjs/rx.subject')
var Singletons = require('@kingjs/rx.singletons')

var A = 'a'

class MySubject extends Subject {
  constructor(id) {
    super()
    this.id = id
  }
}

var singletons = new Singletons()

var collected
singletons[Subscribe](o => collected = o)

var a = singletons.getOrCreate(
  A, id => new MySubject(id)) // ref 0 -> 1
assert(a instanceof MySubject)
assert(a.id == A)

var aAlso = singletons.getOrCreate(
  A, id => new MySubject(id)) // ref 1 -> 2
assert(aAlso == a)

var aComplete = false
a[Subscribe](null, () => aComplete = true)

singletons.release(a) // ref 2 -> 1
assert(!aComplete)

singletons[Next]()
assert(!aComplete)

singletons.release(a) // ref 1 -> 0
assert(!aComplete)

var aAgain = singletons.getOrCreate(
  A, id => new MySubject(id)) // ref 0 -> 1
assert(aAgain == a)

singletons.release(a) // ref 1 -> 0
assert(!aComplete)

assert(!collected)
singletons[Next]() // collect
assert(aComplete)
assert(collected[A] == a)

singletons[Complete]()
```




### Remarks
 - Manufactured subjects are immediately subscribed, ref-counted, and indexed by id.
 - Subsequent activations increment the ref-count while releases reduce the ref-count.
 - When the ref-count is zero then the subject is eligible for collection.
 - Collection occurs when the factory observes any event. At that point all manufactured subjects with no references are completed, unsubscribed and released for collection by  javascript garbage collector.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.singletons
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
|[`@kingjs/rx.select`](https://www.npmjs.com/package/@kingjs/rx.select)|`latest`|
|[`@kingjs/rx.where`](https://www.npmjs.com/package/@kingjs/rx.where)|`latest`|
## Source
https://repository.kingjs.net/rx/singletons
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/singletons)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.singletons
