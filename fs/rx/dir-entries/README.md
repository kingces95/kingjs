# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[dir-entries][ns2]
For each observation, emits many `IGroupObservable`s, one for each directory entry with `Key` equal to the entry name and which itself emits once per observation and completes when the entry is unlinked.
## Usage
```js
require('@kingjs/shim')
var assert = require('assert')
var { Next, Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var SelectMany = require('@kingjs/rx.select-many')
var Do = require('@kingjs/rx.do')
var Log = require('@kingjs/rx.log')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var DirEntries = require('@kingjs/fs.rx.dir-entries')

//create testDir/file.txt
var TempDirName = 'testDir'
var TempFileName = 'file.txt'

var result = []
var subject = new PathSubject(TempDirName)

subject
  [DirEntries]()
  [Log]('DIR', '${path}')
  [Do](o => result.push(o))
  [SelectMany](entry => entry
    [Do](
      o => result.push(o),
      o => result.push('COMPLETE FILE'),
    )
  )
  [Subscribe](
    null,
    () => {
      result.push('COMPLETE DIR')

      var i = 0
      assert(result[i++].basename == TempFileName) // PathSubject
      assert(result[i++] === null)
      assert(result[i++] == 'COMPLETE FILE')
      assert(result[i++] == 'COMPLETE DIR')
      }
  )

subject[Next](null)
subject[Complete]()
```

## API
```ts
dirEntries([dir])
```

### Parameters
- `dir`: The dir whose `dirEntry`s are grouped and reported for every source emission.
### Returns
Returns a `IObservable` which emits `IGroupedObservable`s with the entry name for `Key` and which for each source emission emits `null` or `complete` if the `dirEntry` unlinks.
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
|[`@kingjs/fs.rx.path-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.path-subject)|`latest`|
|[`@kingjs/linq.zip-join`](https://www.npmjs.com/package/@kingjs/linq.zip-join)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.group-by`](https://www.npmjs.com/package/@kingjs/rx.group-by)|`latest`|
|[`@kingjs/rx.log`](https://www.npmjs.com/package/@kingjs/rx.log)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.rolling-select`](https://www.npmjs.com/package/@kingjs/rx.rolling-select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/dir-entries
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/dir-entries)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.dir-entries
