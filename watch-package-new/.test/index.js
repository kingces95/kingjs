var minimatch = require('minimatch')

var string = 'bar.js'
var pattern = '**/*.js'

console.log(minimatch.makeRe(pattern).test(string))
console.log(minimatch(string, pattern))