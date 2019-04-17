# @[kingjs][@kingjs]/[array][ns0].[remove-at][ns1]
Removes an array element at a specific index.
## Usage
```js
var assert = require('assert');
var RemoveAt = require('@kingjs/array.remove-at');

var array = [1, 2, 3];
array = array[RemoveAt](1);
assert.deepEqual(array, [1, 3]);
```

## API
```ts
removeAt(this, index)
```

### Parameters
- `this`: The array from which an element is to be removed.
- `index`: THe index to remove from the array.
### Returns
Returns the array with an element removed and the remaining elements shifted down.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/array.remove-at
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/array/remove-at
## License
MIT

![Analytics](https://analytics.kingjs.net/array/remove-at)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/array
[ns1]: https://www.npmjs.com/package/@kingjs/array.remove-at
