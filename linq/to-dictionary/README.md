# @[kingjs](https://www.npmjs.com/package/kingjs)/[linq](https://www.npmjs.com/package/@kingjs/linq).to-dictionary
Creates a dictionary from a sequence where the dictionary keys and values are projected from each element.
## Usage 
Create a dictionary of people's ages by their name like this:
```js
var sequence = require('@kingjs/sequence');
var toDictionary = require('@kingjs/linq.to-dictionary');

toDictionary.call(
  sequence(
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 19 },
    { name: 'Chris', age: 20 },
  ), 
  function(x) { return x.name; },
  function(x) { return x.age; }
);
```
result:
```js
{
  Alice: 18,
  Bob: 19,
  Chris: 20
}
```
## API
```ts
function toDictionary(
  this: Enumerable,
  keySelector: function(x): any,
  valueSelector?: function(x): any,
): Dictionary
```
### Interfaces
- `Enumerable`: See [@kingjs/sequence](https://www.npmjs.com/package/@kingjs/sequence).
- `Dictionary`: See [@kingjs/dictionary](https://www.npmjs.com/package/@kingjs/dictionary).
### Parameters
- `this`: Sequence to turn into a dictionary.
- `selectKey`: Select a key for each element.
- `selectValue`: Select a value for each element.
### Return Value
Returns a dictionary of one key/value pair for each element. Throws if more than one element maps to the same key. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/linq.to-dictionary
```
## Acknowledgments
Like: [Enumerable.Dictionary](https://msdn.microsoft.com/en-us/library/bb548657(v=vs.110).aspx)
## License
MIT

![Analytics](https://analytics.kingjs.net/linq/to-dictionary)