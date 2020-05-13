# @[kingjs][@kingjs]/[get-generator][ns0]
Returns a `generator` given an `iterable`.
## Usage
```js
var assert = require('assert');
var getGenerator = require('@kingjs/get-generator');

function test(generator) {
  var iterator = generator();
  assert(iterator.next().value == 1);
  assert(iterator.next().done);

  for (var o of generator())
    assert(o == 1);
}

test(getGenerator([1]));
test(getGenerator(function* () { yield 1; }));

```

## API
```ts
getGenerator(value)
```

### Parameters
- `value`: The `generator` or `iterable` to get an `iterator` from.
### Returns
Returns an `iterator`.
### Remarks
Returns a `generator` if passed a `generator`.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/get-generator
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
## Source
https://repository.kingjs.net/get-generator
## License
MIT

![Analytics](https://analytics.kingjs.net/get-generator)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/get-generator
