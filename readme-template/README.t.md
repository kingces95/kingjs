# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Given a `package.json` like this:
```
${include('test/package.json')}
```
And given a `index.js` like this:
```js
${include('test/index.js')}
```
Then...
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install ${name}
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
