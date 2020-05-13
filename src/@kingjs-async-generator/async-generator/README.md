# @[kingjs][@kingjs]/[async-generator][ns0]
A function for testing if another function is an `instanceof` an async generator.
## Usage
```js
var assert = require('assert');
var AsyncGenerator = require('@kingjs/async-generator');

var asyncGenerator = async function* () { };

var prototype = Object.getPrototypeOf(asyncGenerator);
assert(prototype == AsyncGenerator.prototype);

assert(asyncGenerator instanceof AsyncGenerator);
```






## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/async-generator
```

## Source
https://repository.kingjs.net/async-generator
## License
MIT

![Analytics](https://analytics.kingjs.net/async-generator)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/async-generator
