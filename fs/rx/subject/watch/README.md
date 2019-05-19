# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[subject][ns2].[motion-detector][ns3]
Watch a path.
## Usage
```js
var assert = require('assert')
var fs = require('fs')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@kingjs/rx.i-observer')
var WatchSubject = require('@kingjs/fs.rx.subject.motion-detector')

var FileName = 'temp'
var Dir = '.'

var result = [];

var subject = new WatchSubject(Dir)
subject
  [Subscribe](
    () => result.push('next'),
    () => result.push('complete')
  )

setTimeout(() => {
  result.push('add')
  fs.writeFileSync(FileName)

  setTimeout(() => {
    result.push('remove')
    fs.unlinkSync(FileName)

    setTimeout(() => {
      result.push('stop')
      subject[Complete]()

      setTimeout(() => {
        assert.deepEqual(result, [
          'next', 
          'add', 
          'next', 
          'remove', 
          'next', 
          'stop', 
          'complete'
        ])   
      })
    }, 100)
  }, 100)
}, 100)
```



### Parameters
- `path`: The path to watch. Default is the current working directory.
- `observable`: An observable whose completion signals stop watching.
### Returns
Returns an `IObservable` that emits `null` whenever the content of the path changes.
### Remarks
 - The watcher keeps the process alive until completed.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.subject.motion-detector
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/rx.behavior-subject`](https://www.npmjs.com/package/@kingjs/rx.behavior-subject)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/subject/motion-detector
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/subject/motion-detector)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.subject
[ns3]: https://www.npmjs.com/package/@kingjs/fs.rx.subject.motion-detector
