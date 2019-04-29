# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[watch][ns2]
Watch a path.
## Usage
```js
var assert = require('assert')
var fs = require('fs')
var ToPromise = require('@kingjs/rx.to-promise')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@Kingjs/rx.i-observer')
var watch = require('@kingjs/fs.rx.watch')

var fileName = 'temp'

var subject = watch()

subject
  [Subscribe](
    () => console.log('next'),
    () => console.log('complete')
  )

setTimeout(() => {
  console.log('add')
  fs.writeFileSync(fileName)

  setTimeout(() => {
    console.log('remove')
    fs.unlinkSync(fileName)

    setTimeout(() => {
      console.log('stop')
      subject[Complete]()
    }, 10)
  }, 10)
}, 10)
```

## API
```ts
watch([path])
```

### Parameters
- `path`: The path to watch. Default is the current working directory.
### Returns
Returns a `Subject` which implements `IGroupedObservable` whose key is the absolute path being watched and which emits  when a change to the path is observed.
### Remarks
 - Calling `Complete` on the subject stops the watcher.
 - The watcher keeps the process alive until completed.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.watch
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/path.make-absolute`](https://www.npmjs.com/package/@kingjs/path.make-absolute)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/watch
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/watch)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.watch
