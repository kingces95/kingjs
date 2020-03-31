# @[kingjs][@kingjs]/[parse-source][ns0]
Expresses a TypeScript AST as an object literal.
## Usage
```js
/**
 * @description My description.
 */
var assert = require('assert');
var parseSource = require('@kingjs/parse-source');

var ast = parseSource(__filename, { 
  type: true, 
  lines: true,
  position: true,
  character: true
});

var { 
  SourceFile,
  VariableStatement,
  VariableDeclaration,
  CallExpression
} = parseSource;

assert(ast instanceof SourceFile);

var statement = ast.statements[0];
assert(statement instanceof VariableStatement);

var declaration = statement.declarationList[0];
assert(declaration instanceof VariableDeclaration);
assert(declaration.name == 'assert');

var callExpression = declaration.initializer;
assert(callExpression instanceof CallExpression);
assert(callExpression.expression == 'require');
assert(callExpression.arguments[0] == 'assert');

var { 
  Node,
} = parseSource;

for (var node of ast) {
  console.log(node.constructor.name);
  assert(node instanceof Node);
}

var json = JSON.stringify(ast, null, 2);
console.log(json);
```

## API
```ts
parse(path, options, [object Object])
```

### Parameters
- `path`: Path to file to a file to parse.
- `options`: Options to add type, and positioning information to AST.
- `[object Object]`: If true, type information is added to the AST as `.` properties so it'll appear if the AST is serialized to JSON.
### Returns
Each node of the Typescript AST is stripped down to just those properties that return nodes or are terminal literals.


## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/parse-source
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/create-constructor`](https://www.npmjs.com/package/@kingjs/create-constructor)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`typescript`](https://www.npmjs.com/package/typescript)|`latest`|
## Source
https://repository.kingjs.net/parse-source
## License
MIT

![Analytics](https://analytics.kingjs.net/parse-source)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/parse-source
