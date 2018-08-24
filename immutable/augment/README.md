# @[kingjs](https://www.npmjs.com/package/kingjs)/[immutable](https://www.npmjs.com/package/@kingjs/immutable).augment
Updates and/or adds properties of/in a literal object tree with corresponding values from a second using binary operators from a third.
## Usage
Flip `a0` and `b0` property values from `0` to `1` like this:
```js
var augment = require('@kingjs/immutable.augment');

var copy = function(x, y) { return y };

var target = {
  a0: 0,
  a1: 0,
  a2: 0,
  a3: { b0: 0 },
  a4: { b0: 0, b1: 0, b2: 0 },
  a5: { b0: 0 }
};

var source = { 
  a0: 1,
  a1: 1,
  a3: { b0: 1 },
  a4: { b0: 1, b1: 1 }
};

var result = augment(target, source, {
  a0: copy,
  a2: copy,
  a4: { b0: copy, b2: copy },
  a5: { b0: copy }
});
```
result:
```js
{
  a0: 1,
  a1: 0,
  a2: 0,
  a3: { b0: 0 },
  a4: { b0: 1, b1: 0, b2: 0 },
  a5: { b0: 0 }
}
```
## API
```ts
declare function augment(
  this: Descriptor,
  source: Descriptor,
  action: Descriptor
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: Immutable descriptor to add/update with properties from `source` using a corresponding function of `action`.
- `source`: Descriptor with properties with which a clone of `this` will be augmented using a corresponding function of `action`.
- `action`: Functions to combine corresponding property values of `this` and `source` before being copied to a clone of `this`.
### Returns
Returns a clone of `this` whose properties that have a corresponding property in `source` and function in `action` have been updated and with added properties from `source` which have corresponding functions in `action`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/immutable.augment
```
## License
MIT

![Analytics](https://analytics.kingjs.net/immutable/augment)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
