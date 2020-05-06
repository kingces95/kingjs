var { assert,
  '@kingjs': { 
    '-string': { ReplaceAll }
  }
} = module[require('@kingjs-module/dependencies')]()

var result = "fooBarFooBar"[ReplaceAll]('Bar', 'Moo');
assert(result == 'fooMooFooMoo');
