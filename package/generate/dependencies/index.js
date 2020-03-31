var {
  ['@kingjs']: { 
    source: { generate }
  }
} = require('./dependencies')

var {
  Assignment,
  ElementAccess,
  ObjectLiteral,
  Call,
  PropertyAssignment,
  File
} = generate

function generateDependencies() {
  return new File(
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
}

module.exports = generateDependencies