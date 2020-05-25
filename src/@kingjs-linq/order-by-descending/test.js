var {
  '@kingjs': {
    IOrderedEnumerable: { CreateOrderedEnumerable },
    '-linq': { OrderByDescending, EnumerateAndAssert,
      '-static': { of }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(1, 0, 2)
  [OrderByDescending]()
  [EnumerateAndAssert]([2, 1, 0])

of({ value: 2 }, { value: 0 }, { value: 1 })
  [OrderByDescending](o => o.value)
  [EnumerateAndAssert]([{ value: 2 }, { value: 1 }, { value: 0 }])

of(1, 0, 2, 'b', 'a')
  [OrderByDescending](null, (l, r) => {
    if (typeof l != typeof r)
      return typeof l == 'string'
    return l < r
  })
  [EnumerateAndAssert]([2, 1, 0, 'b', 'a'])

of(1, 0, 2)
  [OrderByDescending]()
  [EnumerateAndAssert]([2, 1, 0])

var lastSelector = function(x) { return x.last }
var firstSelector = function(x) { return x.first }
of({ first: 'Bob', last: 'Smith' },
   { first: 'Alice', last: 'Smith' },
   { first: 'Chris', last: 'King' })
  [OrderByDescending](lastSelector)
  [CreateOrderedEnumerable](firstSelector, null, true)
  [EnumerateAndAssert]([
    { first: 'Bob', last: 'Smith' },
    { first: 'Alice', last: 'Smith' },
    { first: 'Chris', last: 'King' },
  ])