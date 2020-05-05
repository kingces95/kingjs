var fs = require('fs')
var ts = require('typescript')
var parse = require('@kingjs/source.parse')
var types = require('..')
var {
  Assignment,
  ElementAccess,
  ObjectLiteral,
  Call,
  PropertyAssignment,
  PropertyAccess,
  File
} = types

var Source = 'source'
parse(`${Source}.js`).then(ast => {
  fs.writeFileSync(`${Source}.ast.json`, 
    JSON.stringify(ast, null, 2)
  )
})

console.log(
  new PropertyAccess('foo', 
    new PropertyAccess('bar', 'baz')
  ).toString()
)

var js = new File(
  new Assignment(
    new ElementAccess('exports', new String("@kingjs")),
    new ObjectLiteral(
      new PropertyAssignment('run', new Call('require', [new String('@kingjs/run')])),
      new PropertyAssignment('reflect', 
        new ObjectLiteral(
          new PropertyAssignment('is', new Call('require', [new String('@kingjs/reflect.is')]))
        )
      )
    )
  ),
  new Assignment(
    new ElementAccess('exports', new String("fs")),
    new Call('require', [new String('fs')])
  )
).toString()

console.log(js)