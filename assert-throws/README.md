# @[kingjs](https://www.npmjs.com/package/kingjs)/assert-throws

Throw an exception if a function fails to throw an exception.

## Usage

Assert that a function throws an exception like this:
```js
var assertThrows = require('@kingjs/assert-throws');
assertThrows(function() { });
```
throws:
```js
"An assertion failed."
```

Provide a more descriptive error message like this:
```js
var assertThrows = require('@kingjs/assert-throws');

assertThrows(
  function() { }, 
  "Expected an exception, but actually passed."
) 
```
throws:
```js
"Expected an exception, but actually passed."
```

## API
```ts
declare function assertThrows(func: Function, message?: string);
```
### Parameters
> `func`: Function expected to throw an exception.

> `message`: Message to throw if `func` fails to throw an exception, else will throw "An assertion failed.".

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/assert-throws
```

## License

MIT

![Analytics](https://analytics.kingjs.net/assert-throws)