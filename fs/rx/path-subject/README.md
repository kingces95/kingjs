# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[path-subject][ns2]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
var assert = require('assert')
var { Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var PathSubject = require('@kingjs/fs.rx.path-subject')

var Dir = '.'

var subject = new PathSubject(Dir)
assert(subject.path === Dir)

var result = []
subject[Subscribe](o => result.push(o))
subject[Complete]()
assert.deepEqual(result, [ ])
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.path-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/path-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/path-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.path-subject
