# @[kingjs][@kingjs]/[fs][ns0].[rx][ns1].[distinct-stats][ns2]
Watches a path until cancelled.
## Usage
```js
var assert = require('assert')
var fs = require('fs')
var ToPromise = require('@kingjs/rx.to-promise')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@Kingjs/rx.i-observer')
var watch = require('@kingjs/fs.rx.distinct-stats')

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
dirEntries([path])
```

### Parameters
- `path`: The path to watch. Default is the current working directory.
### Returns
Returns a `Subject` which emits `next` when a change to the path is observed and `error` with if the watcher reports an error.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.rx.distinct-stats
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/linq.zip-join`](https://www.npmjs.com/package/@kingjs/linq.zip-join)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.rolling-select`](https://www.npmjs.com/package/@kingjs/rx.rolling-select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
## Source
https://repository.kingjs.net/fs/rx/distinct-stats
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/rx/distinct-stats)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.rx
[ns2]: https://www.npmjs.com/package/@kingjs/fs.rx.distinct-stats
