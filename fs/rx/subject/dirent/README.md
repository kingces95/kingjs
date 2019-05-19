# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[dirent][ns3]
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
var DirentSubject = require('@kingjs/fs.rx.subject.dirent')

//create testDir/file.txt
var TempDirName = 'testDir'
var TempFileName = 'file.txt'

var result = []
var subject = new DirentSubject(TempDirName)

subject
  [Log]('DIR', '${path}')
  [Do](o => assert(o.parent == subject))
  [Do](o => result.push(o))
  // [SelectMany](entry => entry
  //   [Do](
  //     o => result.push(o),
  //     () => result.push('COMPLETE FILE'),
  //   )
  // )
  [Subscribe](
    null,
    () => {
      result.push('COMPLETE DIR')

      var i = 0
      assert(result[i] instanceof DirentSubject)
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
$ npm install @kingjs/fs.rx.subject.dirent
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/dirent
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/dirent)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.dirent
