# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
## Usage
Given a `package.json` like this:
```
${include('.test/package.json')}
```
And given a `index.js` like this:
```js
${include('.test/index.js')}
```
And given a `.test/readme.js` like this:
```js
${include('.test/.test/readme.js')}
```
Then running `$ erm` will produce a `README.md` like this:
````
${include('.test/README.md')}
````
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm init @kingjs/readme
```
or
```
$ npm install -g ${name}
$ crm
```
## Execute
With [npx](https://www.npmjs.com/package/npx) installed, run
```
$ npx ${name}
```
## License
${license}

![Analytics](https://analytics.kingjs.net/${join('${value}', segments, '/')})

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
