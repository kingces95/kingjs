# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).pluck
Overwrites each property value on a descriptor with a property value on `this` descriptor which shares the same name, and then deletes the property on `this` descriptor.
## Usage
Pluck the properties representing fruits off of a descriptor containing properties representing foods tastiness rating.
```js
var pluck = require('@kingjs/descriptor.pluck');

var food = {
  banana: 100,
  apple: 50,
  chicken: 20,
  salad: 5
};

var fruits = {
  banana: undefined,
  apple: undefined,
  orange: undefined
};

var result = {
  food: pluck.call(food, fruits),
  fruits
};
```
result:
```js
{
  food: {
    chicken: 20,
    salad: 5
  },

  fruits: {
    banana: 100,
    apple 50,
    orange: undefined
  }
}
```
## API
```ts
declare function pluck(
  this: Descriptor, 
  descriptor: Descriptor
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose properties will be copied to properties with matching names on `descriptor` and then deleted.
- `descriptor`: The descriptor whose properties will be overwritten with values found in properties of the same name on `this`.
### Returns
Returns `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.pluck
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/pluck)
