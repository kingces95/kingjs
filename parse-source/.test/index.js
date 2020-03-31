var parseJavascript = require('..')
var fs = require('fs')

var ast = parseJavascript('sample.js', { debug: 0 })
fs.writeFileSync('.ast.json', 
  JSON.stringify(ast, null, 2)
)

require('./readme')