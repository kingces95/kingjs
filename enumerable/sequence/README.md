# @kingjs/sequence

Yield arguments with the `Enumerable` interface.

## Usage

Create an Enumerable to yield the values `1`, `2`, and `3` like this:

```js
var sequence = require('@kingjs/sequence')

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
declare interface Enumerable {
  getEnumerator: () => {
    moveNext: () => boolean,
    current
  }
}  

declare function sequence(...args: any[]): Enumerable
```
### Interfaces
> `Enumerable`: A sequence of values. If `moveNext()` returns `true`, then `current` has been set to the next (or first) value. If `moveNext()` returns `false`, then all values have been returned.

### Parameters
> `args`: The arguments to yield.

### Return Value
> An enumerable which returns the arguments as a sequence.

## Install
With [npm](https://npmjs.org/) installed, run

```
$ npm install @kingjs/sequence
```

## License

MIT

![Analytics](https://analytics.kingjs.net/enumerable/create)
