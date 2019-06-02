# @[kingjs][@kingjs]/[rx][ns0].[conference-subject][ns1]
A proxy subject that lazily gets its real subject and unsubscribes from its real proxy on complete.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var Subject = require('@kingjs/rx.subject')
var ConferenceSubject = require('@kingjs/rx.conference-subject')

var confId = 0

var observations = []
var subject = new Subject()
subject
  [Subscribe](o => observations.push(o))

var conference = new ConferenceSubject(
  confId, 
  id => {
    assert(id == confId)
    return subject
  }, 
  o => assert(o == subject)
)

subject[Next]('a')

var result = []
conference
  [Subscribe](
    o => result.push(o),
    () => result.push('.')
  )

subject[Next]('b')
conference[Next]('c')
conference[Complete]()

subject[Next]('d')
assert.deepEqual(observations, ['a','b','c','d'])
assert.deepEqual(result, ['b','c','.'])

```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.conference-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.subject.dir`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.dir)|`latest`|
|[`@kingjs/fs.rx.subject.file`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.file)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.proxy-subject`](https://www.npmjs.com/package/@kingjs/rx.proxy-subject)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/conference-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/conference-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.conference-subject
