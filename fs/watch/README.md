# @[kingjs][@kingjs]/[fs][ns0].[watch][ns1]
A tool which, for each `package.json` found in any subdirectory, excluding dot directories, runs  `npm run build`  in the subdirectory whenever a change  is made to any file explicitly included in the package.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/fs.watch');
```

## API
```ts
watch()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/fs.watch
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
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
