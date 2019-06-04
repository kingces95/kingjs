# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[link][ns3]
Represents the link between a path and an inode.
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
var LinkSubject = require('@kingjs/fs.rx.subject.link')

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




### Remarks
For each observation, the link is checked and if its  changed then the previously emitted InodeSubject, if any, is closed and a new derivation InodeSubject is emitted.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.subject.link
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.subject.dir`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.dir)|`latest`|
|[`@kingjs/fs.rx.subject.file`](https://www.npmjs.com/package/@kingjs/fs.rx.subject.file)|`latest`|
|[`@kingjs/rx.conference-subject`](https://www.npmjs.com/package/@kingjs/rx.conference-subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/link
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/link)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.link
