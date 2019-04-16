# @[kingjs][@kingjs]/[array][ns0].[remove][ns1]
Removes an element from an array and shifts the other elements down.
## Usage
```js
var assert = require('assert');
var Remove = require('@kingjs/array.remove');

var array = [1, 2, 3];
array[Remove](2);
assert.deepEqual(array, [1, 3]);
```

## API
```ts
remove(this, index)
```

### Parameters
- `this`: The array from which an element is to be removed.
- `index`: THe index to remove from the array.
### Returns
Returns the array with an element removed and the remaining elements shifted down.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/array.remove
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/array.remove-at`](https://www.npmjs.com/package/@kingjs/array.remove-at)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/array/remove
## License
MIT

![Analytics](https://analytics.kingjs.net/array/remove)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/array
[ns1]: https://www.npmjs.com/package/@kingjs/array.remove
