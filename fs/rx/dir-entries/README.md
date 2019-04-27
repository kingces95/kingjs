# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[dir-entries][ns2]
For each emission reads a `dirEntry` array for `dir` and emits a `IGroupedObservable` for each named entry found which then emits its `dirEntry` or `complete` if the `dirEntry` unlinks.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var of = require('@kingjs/rx.of')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Key } = require('@kingjs/rx.i-grouped-observable')
var Finalize = require('@Kingjs/rx.finalize')
var Select = require('@Kingjs/rx.select')
var Spy = require('@Kingjs/rx.spy')
var Log = require('@Kingjs/rx.log')
var DirEntry = require('@kingjs/fs.rx.dir-entries')

// create testDir/file.txt
var TempDirName = 'testDir';
var TempFileName = 'file.txt';
var TempFilePath = path.join(TempDirName, TempFileName);
fs.mkdirSync(TempDirName)
fs.writeFileSync(TempFilePath)

var result = [];

var dirEntries = of(null, null)
  [DirEntry](TempDirName)

dirEntries
  [Select](o => 
    o[Log]('DIR_ENTRY')
    [Subscribe](
      x => result.push(x),
      () => result.push(o[Key])
    )
  )
  [Subscribe]()

dirEntries
  [Log]('DIR')
  [Spy](
    o => result.push(o),
    o => result.push('.')
  )
  [Finalize](o => {
    fs.unlinkSync(TempFilePath)
    fs.rmdirSync(TempDirName)
    assert(result[0][Key] == 'file.txt') // IGroupedObservable Observed
    assert(result[1].name == 'file.txt') // IGroupedObservable.Next: DirEntry
    assert(result[2].name == 'file.txt') // IGroupedObservable.Next: DirEntry
    assert(result[3] == 'file.txt') // IGroupedObservable.Complete
    assert(result[4] == '.') // Complete
  })
  [Subscribe]()
```

## API
```ts
dirEntries([dir])
```

### Parameters
- `dir`: The dir whose `dirEntry`s are grouped and reported for every source emission.
### Returns
Returns a `IObservable` which emits `IGroupedObservable`s with the entry name for `Key` and which for each source emission report the `dirEntry` or `complete` if the `dirEntry` unlinks.
### Remarks
 - If a source emission is observed before the `dirEntry`s for the previous emission has been read and reported, then the emission is queued. Source emissions beyond that are dropped.
 - Promise will need to be shimmed to implement `IObservable`

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.dir-entries
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/linq.zip-join`](https://www.npmjs.com/package/@kingjs/linq.zip-join)|`latest`|
|[`@kingjs/path.make-absolute`](https://www.npmjs.com/package/@kingjs/path.make-absolute)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.group-by`](https://www.npmjs.com/package/@kingjs/rx.group-by)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.rolling-select`](https://www.npmjs.com/package/@kingjs/rx.rolling-select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/dir-entries
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/dir-entries)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.dir-entries
