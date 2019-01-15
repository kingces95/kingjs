# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments)}
${description}
## Usage
```js
${include('./readme.js').replace('..', name)}
```
## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}', parameters, '\n', signature)}
## Remarks
Run in directory containing `package.json`.
${expand('./FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
