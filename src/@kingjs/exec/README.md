# @[kingjs][@kingjs]/[exec][ns0]
Asynchronously executes a shell command and returns `{ code, stdout, stderr }`.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/exec');
```

## API
```ts
exec(dir, cmd)
```

### Parameters
- `dir`: The directory in which to run the command.
- `cmd`: The command to execute.
### Returns
Returns a promise that resolves to `{ code, stdout, stderr }`.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/exec
```
## Dependencies
|Package|Version|
|---|---|
|[`shelljs`](https://www.npmjs.com/package/shelljs)|`latest`|
## Source
https://repository.kingjs.net/exec
## License
MIT

![Analytics](https://analytics.kingjs.net/exec)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/exec
