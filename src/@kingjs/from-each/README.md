# @[kingjs][@kingjs]/[from-each][ns0]
Generates a sequence of arrays or descriptors  composed of a single element each from a set of arrays.
## Usage
```js
var fromEach = require('@kingjs/from-each');
var assert = require('assert')

function assertSequenceEqual(left, right) {
  while (true) {
    var l = left.next();
    var r = right.next();

    assert(l.done == r.done);

    if (l.done)
      return;

    assert.deepEqual(l.value, r.value);
  }
}

assertSequenceEqual(fromEach({ foo: [] }), [
  { foo: undefined }
][Symbol.iterator]());

assertSequenceEqual(fromEach({ foo: [0] }), [
  { foo: 0 }
][Symbol.iterator]());

assertSequenceEqual(fromEach({ 
  foo: [0, 1], 
}), [
  { foo: 0 },
  { foo: 1 }
][Symbol.iterator]());

assertSequenceEqual(fromEach({ 
  foo: [0, 1], 
  bar: [2], 
}), [
  { foo: 0, bar: 2 },
  { foo: 1, bar: 2 }
][Symbol.iterator]())

assertSequenceEqual(fromEach([ 
  [0, 1], 
  [2], 
]), [
  [0, 2],
  [1, 2]
][Symbol.iterator]())
```

## API
```ts
fromEach(namedArrays)
```

### Parameters
- `namedArrays`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/from-each
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/odometer`](https://www.npmjs.com/package/@kingjs/odometer)|`latest`|
## Source
https://repository.kingjs.net/from-each
## License
MIT

![Analytics](https://analytics.kingjs.net/from-each)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/from-each
