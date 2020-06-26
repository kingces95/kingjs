# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[dir-entries][ns2]
Given a directory returns the directories entries.
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
  [Do](o => assert(o.parent == subject))
  [Do](o => result.push(o))
  [SelectMany](entry => entry
    [Do](
      o => result.push(o),
      () => result.push('COMPLETE FILE'),
    )
  )
  [Subscribe](
    null,
    () => {
      result.push('COMPLETE DIR')

      var i = 0
      assert(result[i] instanceof PathSubject)
      assert(result[i++].basename == TempFileName)

      assert(result[i].constructor.name == 'Dirent')
      assert(result[i++].name === TempFileName)
      
      assert(result[i++] == 'COMPLETE FILE')
      assert(result[i++] == 'COMPLETE DIR')
      }
  )

subject[Next](null)
subject[Complete]()
```

## API
```ts
dirEntries(this)
```

### Parameters
- `this`: A directory represented by a `PathSubject` whose contents are to be emitted.
### Returns
Returns an `IObservable` that emits a `PathSubject` for each directory entry each which in turn emit a `DirEntry` for  every emission of the source `PathSubject`.
### Remarks
 - If a source emission is observed before the `dirEntry`s for the previous emission has been read and reported, then the emission is queued. Source emissions beyond that are dropped.
 - Promise will need to be shimmed to implement `IObservable`
 - A path unlinked between source `PathSubject` emissions results in completion of the previously emitted `PathSubject` for the unlinked path.

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
