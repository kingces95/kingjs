# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[distinct-stats][ns2]
For each emission reads the `fs.stats` for `path` and partitions those stats by `ino` into `IGroupedObservable`s which emit only when the `ctime` changes.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var of = require('@kingjs/rx.of')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Spy = require('@Kingjs/rx.spy')
var Log = require('@Kingjs/rx.log')
var Subject = require('@Kingjs/rx.subject')
var DistinctStats = require('@kingjs/fs.rx.distinct-stats')

var TempFileName = 'file.txt';

var result = [];

var subject = new Subject();
var stats = subject
  [DistinctStats](TempFileName)

stats
  [Select](o => o
    [Subscribe](
      x => result.push('CHANGE'),
      () => result.push(
        `UNLINK PATH ${path.basename(o.path)}`
      )
    )
  )
  [Subscribe]()

stats
  [Spy](
    o => result.push(
      `LINK PATH ${path.basename(o.path)}`
    ),
    () => result.push('COMPLETE')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFileName)
    assert.deepEqual(result, [ 
      'LINK PATH file.txt',
      'CHANGE',
      'CHANGE',
      'UNLINK PATH file.txt',
      'LINK PATH file.txt',
      'CHANGE',
      'UNLINK PATH file.txt',
      'COMPLETE' 
    ])
  })
  [Subscribe]()

var t = 0;
var dt = 10;

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt);

setTimeout(() => {
  fs.writeFileSync(TempFileName)
  subject[Next]()
  subject[Next]()
}, t += dt);

setTimeout(() => {
  fs.unlinkSync(TempFileName)
  fs.writeFileSync(TempFileName)
  subject[Next]()
}, t += dt);

setTimeout(() => {
  subject[Complete]()
}, t += dt);
```

## API
```ts
distinctStats([path])
```

### Parameters
- `path`: The path whose stat `ctime` changes are to be  partitioned by `ino`.
### Returns
Returns a `IObservable` which emits `IGroupedObservable`s where each completes before the next is emitted and emits whenever the ctime changes between source `IObservable` emissions.
### Remarks
 - If a source emission is observed before the stat for the previous emission has been read and reported, then the emission is queued. Source emissions beyond that are dropped.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.distinct-stats
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/path.make-absolute`](https://www.npmjs.com/package/@kingjs/path.make-absolute)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.distinct-until-changed`](https://www.npmjs.com/package/@kingjs/rx.distinct-until-changed)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.spy`](https://www.npmjs.com/package/@kingjs/rx.spy)|`latest`|
|[`@kingjs/rx.window-by`](https://www.npmjs.com/package/@kingjs/rx.window-by)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/distinct-stats
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/distinct-stats)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.distinct-stats
