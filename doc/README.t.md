# Readme
HEADER
## Usage
Generates README.md content from a template in package.config.
```js
'use strict';
var makeReadme = require('..');
var assert = require('assert')
```
## API
```ts
declare function docs(
  path: string, 
  description: any) : string;
```
### Parameters
## Remarks
Run in directory containing `package.json`.
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install -g @kingjs/make-readme
```
## License
MIT