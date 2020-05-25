var {
  '@kingjs': {
    IOrderedEnumerable: { CreateOrderedEnumerable },
    '-linq': { OrderBy, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(1, 0, 2)
  [OrderBy]()
  [EnumerateAndAssert]([0, 1, 2])

of({ value: 2 }, { value: 0 }, { value: 1 })
  [OrderBy](o => o.value)
  [EnumerateAndAssert]([{ value: 0 }, { value: 1 }, { value: 2 }])

of(1, 0, 2, 'b', 'a')
  [OrderBy](null, (l, r) => {
    if (typeof l != typeof r)
      return typeof l == 'string'
    return l < r
  })
  [EnumerateAndAssert](['a', 'b', 0, 1, 2])

of(1, 0, 2)
  [OrderBy](null, null, true)
  [EnumerateAndAssert]([2, 1, 0])

var lastSelector = function(x) { return x.last }
var firstSelector = function(x) { return x.first }
of({ first: 'Bob', last: 'Smith' },
   { first: 'Alice', last: 'Smith' },
   { first: 'Chris', last: 'King' })
  [OrderBy](lastSelector)
  [CreateOrderedEnumerable](firstSelector)
  [EnumerateAndAssert]([
    { first: 'Chris', last: 'King' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Bob', last: 'Smith' },
  ])