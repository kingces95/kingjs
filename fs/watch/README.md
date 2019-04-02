# @[kingjs][@kingjs]/[fs][ns0].[watch][ns1]
Transform files specified by the source `IObservable` into file change events.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/fs.watch');
```

## API
```ts
watch(this[, options[, [object Object][, fileSelector[, selector]]]])
```

### Parameters
- `this`: The source `IObservable`.
- `options`: `chokidar` initialization options.
- `[object Object]`: The name of the property to add to `observations` that returns an array of files currently being watched.
- `fileSelector`: A callback to select the files to watch given an  emission from the source `IObservable`.
- `selector`: A callback to select a result given the last emission from the source `IObservable` and a file event.
### Returns
Returns an `IObservable` which emits file changed events.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.watch
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`chokidar`](https://www.npmjs.com/package/chokidar)|`latest`|
## Source
https://repository.kingjs.net/fs/watch
## License
MIT

![Analytics](https://analytics.kingjs.net/fs/watch)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/fs
[ns1]: https://www.npmjs.com/package/@kingjs/fs.watch
