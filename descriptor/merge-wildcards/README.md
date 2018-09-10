# @[kingjs](https://www.npmjs.com/package/kingjs)/[descriptor](https://www.npmjs.com/package/@kingjs/descriptor).merge-wildcards
If a descriptor contains a property named `'*'`, then replace it with new properties with the same value but whose names are found on another descriptor but not on itself.
## Usage
Promote Alice by two levels and everyone else by one like this:
```js
var mergeWildcards = require('@kingjs/descriptor.merge-wildcards');

var people = {
  alice: { level: 0 },
  bob: { level: 1 },
  chris: { level: 2 }
}

var promotions = {
  alice: 2,
  '*': 1
}

var specificPromotions = mergeWildcards.call(
  promotions, people
);

for (var name in specificPromotions)
  people[name].level += specificPromotions[name];
```
result:
```js
{
  alice: { level: 2 },
  bob: { level: 2 },
  chris: { level: 3 }
}
```
## API
```ts
declare function mergeWildcards(
  this: Descriptor,
  other: Descriptor,
  copyOnWrite: boolean
): Descriptor
```
### Interfaces
- `Descriptor`: see [@kingjs/descriptor][descriptor]
### Parameters
- `this`: The descriptor whose wildcard property `*` is expanded.
- `other`: The descriptor whose names not present on `this` become the property names of the wildcard expansion.
- `copyOnWrite`: If true, then a copy of `this` will be created on the first write and returned instead of `this`.
### Returns
Returns `this` with it's wildcard property `*` replaced with copies whose names are found on `other` but not on `this`.
## Remarks
If `this` is frozen or `copyOnWrite` specified then a copy of `this` will be created on the first write and returned instead of `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/descriptor.merge-wildcards
```
## License
MIT

![Analytics](https://analytics.kingjs.net/descriptor/merge-wildcards)

  [descriptor]: https://www.npmjs.com/package/@kingjs/descriptor