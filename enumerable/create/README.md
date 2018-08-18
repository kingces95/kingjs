# @[kingjs](https://www.npmjs.com/package/kingjs)/[enumerable](https://www.npmjs.com/package/@kingjs/enumerable).create
Creates an Enumerable out of `arguments`.
## Usage
Create an Enumerable from the arguments `1`, `2`, and `3` like this:
```js
var sequence = require('@kingjs/enumerable.create')

var enumerable = sequence(0, 1, 2);
var enumerator = enumerable.getEnumerator();

var result = [];
while (enumerator.moveNext()) 
  result.push(enumerator.current);

result;
```
result:
```js
[0, 1, 2];
```
## API
```ts
declare function create(
  ...args: any[]
): Enumerable
```
### Interfaces
- `Enumerable`: See [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define).
### Parameters
- `args`: The values returned as an `Enumerable`.
### Return Value
- Returns an `Enumerable` which generates `args`.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/enumerable.create
```

## License

MIT

![Analytics](https://analytics.kingjs.net/enumerable/create)
