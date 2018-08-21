# @[kingjs](https://www.npmjs.com/package/kingjs)/apply
Calls a list of functions using each result as the `this` of the next call.
## Usage
Take the strings `'Foo'`, `'Bar'`, and `'Baz'`, and sort, lower, and join them with a dash like this:
```js
var apply = require('@kingjs/apply')

function sortLowerAndJoin() {
  return apply.call(arguments,
    Array.prototype.sort, [ ],
    Array.prototype.map, [ function(x) { return x.toLowerCase(); } ],
    Array.prototype.join, [ '-' ]
  )
}

sortLowerAndJoin('Foo', 'Bar', 'Baz');
```
result:
```js
'bar-baz-foo'
```
## API
```ts
function apply(
  this: any,
  function: (this: any) => any,
  ...functionArguments: any[],
): any
```
### Parameters
- `this`: The `this` passed to the first function.
- `functionArguments`: Alternating function array pairs.
### Return Value
The result of applying each function in `functionArguments` using the subsequent array as arguments and the previous result as `this`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/apply
```
## Remarks
`apply` allows joining data with algorithms without polluting the target prototype. The approach is analogous to C# extension methods. 

For example, consider joining "array like" data, like `arguments`, with the algorithms found on `Array.prototype`. Specifically, consider joining `arguments` with `Array.prototype.map`. In C#, extension methods allow for a syntax that makes the method appear to live on the data like `arguments.map(...)`. In Javascript the join is more verbose and done like `Array.prototype.map.apply(arguments, ...)`. 

The only way to achieve that same "dot" syntax in Javascript is to pollute the target by assigning the method to a property like `arguments.map = Array.prototype.map`. This works but is problematic for a number of reasons. For one, different modules could want to use different versions of `map` on the same array instance but only one version can be assigned at a time.

`apply` allows for a compromise Javascript syntax which preserves the essential aspects of C# extension methods:
- Algorithms are decoupled from the data they operate; Algorithms can be declared in different modules from each other and the data on which they operate. 
- No pollution of the objects or function prototypes necessary to invoke the algorithms on data.
- Syntax is fluent but uses commas and brackets instead of dots and parentheses. 

## See Also
- [@kingjs/linq](https://www.npmjs.com/package/@kingjs/linq) - A library of algorithms for operating on data that conforms to the Enumerable interface.
- [@kingjs/enumerable.define](https://www.npmjs.com/package/@kingjs/enumerable.define) - A description of the Enumerable interface and a function for creating instances of Enumerable data.

## Acknowledgments
Like [C# extension methods](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods).
## License
MIT

![Analytics](https://analytics.kingjs.net/apply)