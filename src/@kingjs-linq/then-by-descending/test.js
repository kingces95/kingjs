var {
  '@kingjs': {
    '-linq': { OrderByDescending, ThenByDescending, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var lastSelector = function(x) { return x.last }
var firstSelector = function(x) { return x.first }
of({ first: 'Bob', last: 'Smith' },
   { first: 'Alice', last: 'Smith' },
   { first: 'Chris', last: 'King' })
  [OrderByDescending](lastSelector)
  [ThenByDescending](firstSelector)
  [EnumerateAndAssert]([
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ])