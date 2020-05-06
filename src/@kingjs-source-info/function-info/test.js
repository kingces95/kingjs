var assert = require('assert')
var { promises: fs } = require('fs')
var FunctionInfo = require('..')
var parse = require('@kingjs/source.parse')
var { FunctionDeclaration } = require('@kingjs/source.types')

function assertDeepEquals(lhs, rhs) {
  if (typeof lhs != 'object') {
    assert.equal(lhs, rhs)
    return
  }

  for (var name in lhs)
    assertDeepEquals(lhs[name], rhs[name])
}

async function run() {
  var ast = await parse('./.test/source.js')

  for (var node of ast) {
    if (node instanceof FunctionDeclaration)
      break;
  }

  var expectedInfo = JSON.parse(await fs.readFile('source.json'))
  var actualInfo = new FunctionInfo(node)

  var json = JSON.stringify(actualInfo, null, 2)
  console.log(json)
  //await fs.writeFile('source.json', json)

  assertDeepEquals(expectedInfo, actualInfo)
  assertDeepEquals(actualInfo, expectedInfo)
}

run()