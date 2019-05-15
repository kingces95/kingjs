# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[link-subject][ns2]
Returns a `IGroupedObservable` with `path` for a `Key`  that emits `IGroupedObservable`s with `stats.ino` for `Key` that each emit `stats.ino` whenever the `ctime` changes.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var Path = require('path')
var { Subscribe } = require('@kingjs/rx.i-observable')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var WatchSubject = require('@kingjs/fs.rx.watch-subject')
var LinkSubject = require('@kingjs/fs.rx.link-subject')

var parse = Path.parse('/foo/bar')

process.chdir('test')

var pwd = LinkSubject.create(
  o => new WatchSubject(o.path)
)

var testFile = pwd.create('foo.txt')

testFile
  [Log]('FOO')
  [SelectMany]()
  [Log]('STATS')
  [Subscribe]()
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.link-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.path-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.path-subject)|`latest`|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/rx.behavior-subject`](https://www.npmjs.com/package/@kingjs/rx.behavior-subject)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.window-by`](https://www.npmjs.com/package/@kingjs/rx.window-by)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/link-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/link-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.link-subject
