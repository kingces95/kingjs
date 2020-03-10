# @[kingjs][@kingjs]/[shell][ns0]
Asynchronously spawns a shell, executes a command, streams stdio, and, if stderr is written, buffers and throws that text.
## Usage
```js
var assert = require('assert');
var xxx = require('@kingjs/shell');
```

## API
```ts
shell(command)
```

### Parameters
- `command`: The command to execute in the shell.
### Returns
Returns an EventSource.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/shell
```

## Source
https://repository.kingjs.net/shell
## License
MIT

![Analytics](https://analytics.kingjs.net/shell)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/shell
