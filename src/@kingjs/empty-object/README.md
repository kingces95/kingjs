# @[kingjs][@kingjs]/[empty-object][ns0]
An empty frozen object.
## Usage
```js
'use strict';

var emptyObject = require('.');

var assert = require('assert');

assert(Object.getOwnPropertyNames(emptyObject).length == 0);
assert(Object.getPrototypeOf(emptyObject) == Object.getPrototypeOf({ }));
assert(Object.isFrozen(emptyObject));

```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/empty-object
```

## Source
https://repository.kingjs.net/empty-object
## License
MIT

![Analytics](https://analytics.kingjs.net/empty-object)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/empty-object
