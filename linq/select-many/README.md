# @[kingjs][@kingjs]/[linq][ns0].[select-many][ns1]
Generate a sequence by concatenating sequences  projected from elements of a sequence.
## Usage
```js
require('kingjs');
var selectMany = require('@kingjs/linq.select-many');
var assert = require('assert');
var sequenceEqual = require('@kingjs/linq.sequence-equal');
var toArray = require('@kingjs/linq.to-array');

function readme() {
  var peopleAndPets = sequence(
    { name: 'Alice', pets: sequence('Tiger', 'Butch') },
    { name: 'Bob', pets: sequence('Spike', 'Fluffy') }
  );

  var petOwners = selectMany.call(
    peopleAndPets,
    function(x, i) { 
      assert(x.name != 'Alice' || i == 0);
      assert(x.name != 'Bob' || i == 1);
      return x.pets; 
    },
    function(x, p) { return x.name + ' owns ' + p; }
  )

  var debug = toArray.call(petOwners);

  assert(
    sequenceEqual.call(
      petOwners,
      sequence(
        'Alice owns Tiger', 
        'Alice owns Butch', 
        'Bob owns Spike', 
        'Bob owns Fluffy'
      )
    )
  )
}
readme();

function flatten() {
  var result = selectMany.call(
    sequence(
      sequence(0, 1),
      sequence(2, 3)
    )
  );

  var debug = toArray.call(result);

  assert(
    sequenceEqual.call(
      result,
      sequence(0, 1, 2, 3)
    )
  )
}
flatten();
```

## API
```ts
selectMany(collectionSelector, resultSelector)
```

### Parameters
- `collectionSelector`: 
- `resultSelector`: 



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.select-many
```

## Source
https://repository.kingjs.net/linq/select-many
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/select-many)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/linq
[ns1]: https://www.npmjs.com/package/@kingjs/linq.select-many
