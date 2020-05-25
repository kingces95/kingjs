var {
  '@kingjs': {
    '-linq': { OrderBy, ThenBy, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var lastSelector = function(x) { return x.last }
var firstSelector = function(x) { return x.first }
of({ first: 'Bob', last: 'Smith' },
   { first: 'Alice', last: 'Smith' },
   { first: 'Chris', last: 'King' })
  [OrderBy](lastSelector)
  [ThenBy](firstSelector)
  [EnumerateAndAssert]([
    { first: 'Chris', last: 'King' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Bob', last: 'Smith' },
  ])