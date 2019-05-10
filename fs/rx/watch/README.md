# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watch][ns2]
Watch a path.
## Usage
```js
var assert = require('assert')
var fs = require('fs')
var PathSubject = require('@kingjs/fs.rx.path-subject')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@kingjs/rx.i-observer')
var Watch = require('@kingjs/fs.rx.watch')

var fileName = 'temp'

var result = [];

var subject = new PathSubject()
subject[Watch]('.', subject)
  [Subscribe](
    () => result.push('next'),
    () => result.push('complete')
  )

setTimeout(() => {
  result.push('add')
  fs.writeFileSync(fileName)

  setTimeout(() => {
    result.push('remove')
    fs.unlinkSync(fileName)

    setTimeout(() => {
      result.push('stop')
      subject[Complete]()

      setTimeout(() => {
        assert.deepEqual(result, [
          'add', 'next', 'remove', 'next', 'stop', 'complete'
        ])   })
    }, 100)
  }, 100)
}, 100)
```

## API
```ts
watch([path[, observable]])
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
$ npm install @kingjs/fs.rx.watch
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.path-subject`](https://www.npmjs.com/package/@kingjs/fs.rx.path-subject)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/watch
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/watch)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.watch
