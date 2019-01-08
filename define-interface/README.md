# @[kingjs](https://www.npmjs.com/package/kingjs)/define-interface
Defines or aliases a group of global symbols.
## Usage
Define/alias global symbols on `Function`s representing an interface `IFoo` with member `foo` and `bar`, and an interface `IBar` which extends `IFoo` with member `bar` like this:
```js
```
## API
```ts
declare function defineInterface(target, name, descriptor);
```
### Parameters
- `target`: The target to declare the interface on.
- `name`: The name of the property on target to assign the interface. If there is no `descriptor.id`, then `name` will be used as the symbol name.
- `descriptor`: The members, extensions, and symbol comprising the interface.
  - `id`: Optional symbol to identify the interface.
  - `members`: Optional key value pairs where value is `null` or `symbol`.
  - `extends`: Optional array of interfaces expressed as functions.
### Returns
A function representing the interface.
## Remarks
An interface is a `Function` that throws when invoked, has no prototype, whose `@kingjs/identity` and `@kingjs/polymorphisms` are configured, and which has a properties corresponding to `members` and whose values are symbols.

All symbols are globally registered. 
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/define-interface
```
## License
MIT

![Analytics](https://analytics.kingjs.net/define-interface)