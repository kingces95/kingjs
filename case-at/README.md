# @[kingjs](https://www.npmjs.com/package/kingjs)/case-at

Functions for testing and setting the case of a character in a string.

## Usage

Test the if "H" in "Hello World!" is upper case like this:
```js
var caseAt = require('@kingjs/case-at');
caseAt.isRaised("Hello World!", 0);
```
returns
```js
true
```

Lower the the case of "W" in "Hello world!" like this:
```js
var caseAt = require('@kingjs/case-at');
caseAt.lower("Hello World!", 6);
```
returns
```js
"Hello world!"
```

## API
```ts
declare function isRaised(value: string, index: number): boolean;
declare function isLowered(value: string, index: number): boolean;
declare function raise(value: string, index: number): string;
declare function lower(value: string, index: number): string;
```
### Parameters
> `isRaised`: True if the character at `string`'s `index` is upper case.

> `isLower`: True if the character at `string`'s `index` is lower case.

> `raise`: Raise the case of the character at `string`'s `index`.

> `lower`: Lower the case of the character at `string`'s `index`.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/case-at
```

## License

MIT

![Analytics](https://analytics.kingjs.net/case-at)