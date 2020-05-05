# @[kingjs][@kingjs]/[linq][ns0].[to-lookup][ns1]
Creates a dictionary from a sequence  where values are groups of elements keyed by a  name common to all members of the group.
## Usage
```js
require('kingjs');
var ToLookup = require('@kingjs/linq.to-lookup');
var ToArray = require('@kingjs/linq.to-array');
var assert = require('assert');

function readme() {
  var lookup = [
      { name: 'Alice', pet: 'Fluffy' },
      { name: 'Alice', pet: 'Spike' },
      { name: 'Bob', pet: 'Tiger' }
    ][ToLookup](
    function(x) { return x.name; },
    function(x) { return x.pet; }
  )
  assert(!('toString' in lookup));
  
  for (var key in lookup)
    lookup[key] = lookup[key][ToArray]();

  assert(Object.keys(lookup).length == 2);
  assert(lookup.Alice[0] == 'Fluffy');
  assert(lookup.Alice[1] == 'Spike');
  assert(lookup.Bob[0] == 'Tiger');
}
readme();

function defaultValueSelector() {
  var lookup = [
      { name: 'Alice', pet: 'Fluffy' },
      { name: 'Alice', pet: 'Spike' },
      { name: 'Bob', pet: 'Tiger' }
    ][ToLookup](
    function(x) { return x.name; }
    // default selector
  )
  assert(!('toString' in lookup));
  
  for (var key in lookup)
    lookup[key] = lookup[key][ToArray]();

  assert(Object.keys(lookup).length == 2);
  assert(lookup.Alice[0].pet == 'Fluffy');
  assert(lookup.Alice[1].pet == 'Spike');
  assert(lookup.Bob[0].pet == 'Tiger');
}
defaultValueSelector();

```

## API
```ts
toLookup(keySelector, valueSelector)
```

### Parameters
- `keySelector`: 
- `valueSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.to-lookup
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/dictionary`](https://www.npmjs.com/package/@kingjs/dictionary)|`latest`|
|[`@kingjs/i-enumerable`](https://www.npmjs.com/package/@kingjs/i-enumerable)|`latest`|
|[`@kingjs/i-enumerator`](https://www.npmjs.com/package/@kingjs/i-enumerator)|`latest`|
|[`@kingjs/reflect.export-extension`](https://www.npmjs.com/package/@kingjs/reflect.export-extension)|`latest`|
## Source
https://repository.kingjs.net/linq/to-lookup
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/to-lookup)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.to-lookup
