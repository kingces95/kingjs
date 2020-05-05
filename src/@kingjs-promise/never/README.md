# @[kingjs][@kingjs]/[promise][ns0].[never][ns1]
Return a promise that never resolves.
## Usage
```js
var assert = require('assert');
var sleep = require('@kingjs/promise.never');

var ms = 100;
var now = Date.now();
sleep(ms).then(
  () => assert(Date.now() + ms > now)
);
```

## API
```ts
never()
```




## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/promise.never
```

## Source
https://repository.kingjs.net/promise/never
## License
MIT

![Analytics](https://analytics.kingjs.net/promise/never)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/promise
[ns1]: https://www.npmjs.com/package/@kingjs/promise.never
