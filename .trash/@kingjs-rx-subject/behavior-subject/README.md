# @[kingjs][@kingjs]/[rx][ns0].[behavior-subject][ns1]
A subject that tracks the last value emitted  and exposes it as `Value` and will upon subscription will  replay that value.
## Usage
```js
var assert = require('assert')
var BehaviorSubject = require('@kingjs/rx.behavior-subject')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete, Error } = require('@kingjs/rx.i-observer')

var result = []
var subject = new BehaviorSubject()
subject[Subscribe](o => result.push(o))
subject[Next](0)
subject[Subscribe](o => result.push(o))
subject[Complete]()
subject[Subscribe](o => result.push(o))
assert.deepEqual(result, [0, 0, 0])

var result = []
var subject = new BehaviorSubject(1)
subject[Subscribe](o => result.push(o))
subject[Complete]()
subject[Subscribe](o => result.push(o))
assert.deepEqual(result, [1])
```



### Parameters
- `value`: Optional initial value.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.behavior-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/behavior-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/behavior-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.behavior-subject
