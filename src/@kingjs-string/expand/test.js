var { assert,
  '@kingjs': { 
    '-string': { Expand }
  }
} = module[require('@kingjs-module/dependencies')]()

var foo = 'bar'
var result = 'Key "foo" is "${foo}"'[Expand]({ foo })
assert('Key "foo" is "bar"' == result)