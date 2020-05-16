# @[kingjs][@kingjs]/[reflect][ns0].[implement-i-enumerable][ns1]
Implements `IEnumerable` given a factory that, given the container, returns a `moveNext` function.
## Usage
```js
var assert = require('assert');
var IEnumerable = require('@kingjs/i-enumerable');
var IEnumerator = require('@kingjs/i-enumerator');
var implementIEnumerable = require('@kingjs/reflect.implement-i-enumerable');

var target = implementIEnumerable(
  [ 0 ], 
  function moveNextFactory(instance) {
    var i = -1;

    return function moveNext() {
      if (i + 1 == instance.length)
        return false;
      this.current_ = instance[++i]
      return true;
    }
  }
)

var enumerator = target[IEnumerable.getEnumerator]();
assert(enumerator[IEnumerator.moveNext]());
assert(enumerator[IEnumerator.current] == 0);
assert(!enumerator[IEnumerator.moveNext]());
```

## API
```ts
implementIEnumerable(target, createMoveNext(this, instance))
```

### Parameters
- `target`: The instance on which to implement `IEnumerable`.
- `createMoveNext`: A factory that, given the container, returns a `moveNext` function. `moveNext` should return `true` if more  elements remain; otherwise `false`.
  - `this`: The enumerator. When a new value is generate it should be stored in `this.current_`.
  - `instance`: The instance to enumerate.
### Returns
`target`


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/reflect.implement-i-enumerable
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`^1.0.6`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`^1.0.7`|
|[`@kingjs/reflect.implement-interface`](https://www.npmjs.com/package/@kingjs/reflect.implement-interface)|`^1.0.1`|
## Source
https://repository.kingjs.net/reflect/implement-i-enumerable
## License
MIT

![Analytics](https://analytics.kingjs.net/reflect/implement-i-enumerable)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/reflect
[ns1]: https://www.npmjs.com/package/@kingjs/reflect.implement-i-enumerable
