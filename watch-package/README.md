# @[kingjs][@kingjs]/[watch-package][ns0]
A tool which, for each `package.json` found in any subdirectory, excluding dot directories, runs  `npm run build`  in the subdirectory whenever a change  is made to any file explicitly included in the package.

## API
```ts
watchFiles()
```


### Remarks
 - This tool was developed to automate manual tasks  that updated and/or generated files from source code. For example, updating `package.json` description and/or generating `README.md` from JsDoc comments found in source.
 - Various heuristics are used to attempt to only kick off runs in response to manual interactions:
   - After a change is detected, a timer starts. If 100ms elapses without another change then `npm run build` is executed in the `package.json` directory. If another change is detected with that 100ms, then the timer restarts. This should batch changes made by Save All or Replace All.
   - Watching is suspended while `npm run build` is executing. This way changes made by the run itself do not schedule subsequent runs.
 - The watched files are those specified in `files` in the `package.json`. If `files` is not specified, then no files  are watched for that package.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/watch-package
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/i-grouped-observable`](https://www.npmjs.com/package/@kingjs/i-grouped-observable)|`latest`|
|[`@kingjs/i-observable`](https://www.npmjs.com/package/@kingjs/i-observable)|`latest`|
|[`@kingjs/i-observer`](https://www.npmjs.com/package/@kingjs/i-observer)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.blend`](https://www.npmjs.com/package/@kingjs/rx.blend)|`latest`|
|[`@kingjs/rx.create`](https://www.npmjs.com/package/@kingjs/rx.create)|`latest`|
|[`@kingjs/rx.debounce-time`](https://www.npmjs.com/package/@kingjs/rx.debounce-time)|`latest`|
|[`@kingjs/rx.group-by`](https://www.npmjs.com/package/@kingjs/rx.group-by)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
|[`chokidar`](https://www.npmjs.com/package/chokidar)|`latest`|
|[`deep-equals`](https://www.npmjs.com/package/deep-equals)|`latest`|
|[`rxjs`](https://www.npmjs.com/package/rxjs)|`latest`|
|[`shelljs`](https://www.npmjs.com/package/shelljs)|`latest`|
## Source
https://repository.kingjs.net/watch-package
## License
MIT

![Analytics](https://analytics.kingjs.net/watch-package)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/watch-package
