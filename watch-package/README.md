# @[kingjs][@kingjs]/[watch-package][ns0]
A tool which, for each `package.json` found in any subdirectory, excluding dot directories, runs  `npm run generate`  in the subdirectory whenever a change  is made to any file explicitly included in the package.

## API
```ts
watchPackages()
```


### Remarks
- This tool was developed to automate manual tasks  that updated and/or generated files from source code. For example, updating `package.json` description and/or generating `README.md` from JsDoc comments found in source.
- Various heuristics are used to attempt to only kick off runs in response to manual interactions:
  - After a change is detected, a timer starts. If 100ms elapses without another change then `npm run generate` is executed in the `package.json` directory. If another change is detected with that 100ms, then the timer restarts. This should batch changes made by Save All or Replace All.
  - Watching is suspended while `npm run generate` is executing. This way changes made by the run itself do not generate subsequent runs.
- The watched files are those specified in `files` in the `package.json`. If `files` is specified, then no files  are watched for that package.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/watch-package
```
## Dependencies
|Package|Version|
|---|---|
|[`shelljs`](https://www.npmjs.com/package/shelljs)|`^1.0.0`|
|[`chokidar`](https://www.npmjs.com/package/chokidar)|`^2.1.1`|
## Source
https://repository.kingjs.net/watch-package
## License
MIT

![Analytics](https://analytics.kingjs.net/watch-package)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/watch-package
