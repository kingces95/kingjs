# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).map-names
Creates a descriptor with a copy of a subset of properties from an existing descriptor with property names.
## Usage
Create a new descriptor and the copy values in properties `$alpha`, `$bravo`, and `$delta` from an existing descriptor into properties with names `alpha`, `bravo`, and `delta` like this:
```js
var mapNames = require('@kingjs/descriptor.map-names');

mapNames.call({
  $alpha: 0,
  $bravo: 1,
  $delta: 2,
  value: 3
}, {
  $alpha: 'alpha',
  $bravo: 'bravo',
  $delta: 'delta'
});
```
result:
```js
{
  alpha: 0,
  bravo: 1,
  delta: 2
}
```
The same result can also be achieved procedurally like this:
```js
var mapNames = require('@kingjs/descriptor.map-names');

mapNames.call({
  $alpha: 0,
  $bravo: 1,
  $delta: 2,
  value: 3
}, function(name) {
  if (name == 'value')
    return undefined;
  
  return name.substr(1);
});
```
result:
```js
{
  alpha: 0,
  bravo: 1,
  delta: 2
}
```
## API
```ts
declare function mapNames(
  this: Descriptor,
  source: Descriptor,
  map: { 
    [index: string]: string | number, 
    [index: number]: string | number 
  } | { 
    (name: string): string | number
  }
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose renamed properties will be copied to a new descriptor.
- `map`: Either 
  - A descriptor containing a mapping of property names on `this` to names on the new descriptor. Properties on `this` not included in `map` will not be copied.
  - A callback which maps names on `this` to names on the new descriptor. If the callback returns `undefined` then the property value is not copied.
### Returns
A new descriptor with a copy of a subset of properties from `this` but with different property names according to `map` or `null` if no properties were copied.
## Remarks
No check is made to ensure mapped names are unique. Behavior is undefined when if duplicate names are provided.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.map-names
```
## License
MIT

![Analytics](https://analytics.kingjs.net/unknown)


  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor
