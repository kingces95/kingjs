# @[kingjs][@kingjs]/[watch-package-new][ns0]
A tool which, for each `package.json` found in any subdirectory, excluding dot directories, runs  `npm run build`  in the subdirectory whenever a change  is made to any file explicitly included in the package.




### Remarks
 - This tool was developed to automate manual tasks  that updated and/or generated files from source code. For example, updating `package.json` description and/or generating `README.md` from JsDoc comments found in source.
 - Various heuristics are used to attempt to only kick off runs in response to manual interactions:
   - After a change is detected, a timer starts. If 100ms elapses without another change then `npm run build` is executed in the `package.json` directory. If another change is detected with that 100ms, then the timer restarts. This should batch changes made by Save All or Replace All.
   - Watching is suspended while `npm run build` is executing. This way changes made by the run itself do not schedule subsequent runs.
 - The watched files are those specified in `files` in the `package.json`. If `files` is not specified, then no files  are watched for that package.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/watch-package-new
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/fs.rx.watch-many`](https://www.npmjs.com/package/@kingjs/fs.rx.watch-many)|`latest`|
|[`@kingjs/rx.debounce`](https://www.npmjs.com/package/@kingjs/rx.debounce)|`latest`|
|[`@kingjs/rx.do`](https://www.npmjs.com/package/@kingjs/rx.do)|`latest`|
|[`@kingjs/rx.i-grouped-observable`](https://www.npmjs.com/package/@kingjs/rx.i-grouped-observable)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.pool`](https://www.npmjs.com/package/@kingjs/rx.pool)|`latest`|
|[`@kingjs/rx.select`](https://www.npmjs.com/package/@kingjs/rx.select)|`latest`|
|[`@kingjs/rx.select-many`](https://www.npmjs.com/package/@kingjs/rx.select-many)|`latest`|
|[`@kingjs/rx.skip`](https://www.npmjs.com/package/@kingjs/rx.skip)|`latest`|
|[`@kingjs/rx.where`](https://www.npmjs.com/package/@kingjs/rx.where)|`latest`|
|[`@kingjs/rx.window-by`](https://www.npmjs.com/package/@kingjs/rx.window-by)|`latest`|
|[`@kingjs/shim`](https://www.npmjs.com/package/@kingjs/shim)|`latest`|
|[`minimatch`](https://www.npmjs.com/package/minimatch)|`latest`|
|[`shelljs`](https://www.npmjs.com/package/shelljs)|`latest`|
## Source
https://repository.kingjs.net/watch-package-new
## License
MIT

![Analytics](https://analytics.kingjs.net/watch-package-new)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/watch-package-new
