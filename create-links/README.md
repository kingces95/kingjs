# @[kingjs][@kingjs]/[create-links][ns0]
Recursively creates npm links for all dependent packages.

## API
```ts
createLinks()
```


### Remarks
 - Creates a `node_modules` directory at the git enlistment root that contains symbolic links to
   - directories and sub-directories of the current directory which contain  a `package.json` file and
   - symbolic links into sub-directories of a `.npm` directory at the enlistment root  which contains packages for all external node modules discovered in all packages found by enumerating directories starting at the git enlistment root.
 - Directories starting with `.` are ignored.
 - Directories are enumerated using git and respecting files added and removed from the git index.
 - This directory arrangement allows changes in one package to be reflected in all referring packages without having to publish and sync the referenced package.

## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/create-links
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/git.get-dir`](https://www.npmjs.com/package/@kingjs/git.get-dir)|`latest`|
|[`@kingjs/git.get-files`](https://www.npmjs.com/package/@kingjs/git.get-files)|`latest`|
|[`@kingjs/package-name.parse`](https://www.npmjs.com/package/@kingjs/package-name.parse)|`latest`|
|[`shelljs`](https://www.npmjs.com/package/shelljs)|`latest`|
## Source
https://repository.kingjs.net/create-links
## License
MIT

![Analytics](https://analytics.kingjs.net/create-links)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/create-links
