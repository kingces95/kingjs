# @[kingjs](https://www.npmjs.com/package/kingjs)/assert

Throw an exception if a condition fails.

## Usage

Assert a condition in your code or test like this:
```js
var assert = require('@kingjs/assert');

assert(0 == 1);
```
throws:
```js
"An assertion failed."
```

Simply fail all the time like this:
```js
var assert = require('@kingjs/assert');

assert();
```
throws:
```js
"An assertion failed."
```

Provide a more descriptive error message like this:
```js
var assert = require('@kingjs/assert');

var expected = 0;
var actual = 1;

assert(
  actual == expected,
  "Expected '" + expected + "' but actually got '" + actual + "'."
);
```
throws:
```js
"Expected '0' but actually got '1'."
```

## API
```ts
declare function assert(condition?: boolean, message?: string);
```
### Parameters
> `condition`: If false (or omitted), throws an exception.

> `message`: Message to throw if condition fails, else will throw "An assertion failed.".

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/assert
```

## Acknowledgments
`assert` is old as dirt and just as underappreciated.

## License

MIT

![Analytics](https://analytics.kingjs.net/assert)