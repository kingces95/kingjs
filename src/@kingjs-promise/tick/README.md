# @[kingjs][@kingjs]/[promise][ns0].[sleep][ns1]
Return a promise that resolves after a specified time period.
## Usage
```js
var assert = require('assert');
var sleep = require('@kingjs/promise.sleep');

var ms = 100;
var now = Date.now();
sleep(ms).then(
  () => assert(Date.now() + ms > now)
);
```

## API
```ts
sleep(ms)
```

### Parameters
- `ms`: Time in milliseconds to sleep.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/promise.sleep
```

## Source
https://repository.kingjs.net/promise/sleep
## License
MIT

![Analytics](https://analytics.kingjs.net/promise/sleep)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/promise
[ns1]: https://www.npmjs.com/package/@kingjs/promise.sleep
