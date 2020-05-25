var { assert,
  '@kingjs': {
    ILookup: { Get, Has },
    IGroupedEnumerable: { Key },
    '-linq': { Select, EnumerateAndAssert,
      '-reduction': { ToArray, ToLookup },
      '-static': { of }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var lookup = 
  of(
    { name: 'Alice', pet: 'Fluffy' },
    { name: 'Alice', pet: 'Spike' },
    { name: 'Bob', pet: 'Tiger' }
  )
  [ToLookup](
    function(x) { return x.name },
    function(x) { return x.pet }
  )

assert.ok(lookup[Has]('Alice'))
assert.ok(lookup[Has]('Bob'))

lookup[Get]('Bob')[EnumerateAndAssert](['Tiger'], { key: 'Bob' })
lookup[Get]('Alice')[EnumerateAndAssert]([
  'Fluffy', 
  'Spike'
], { key: 'Alice' })

lookup
  [Select](o => ({ 
    key: o[Key], 
    value: o[ToArray]() 
  }))
  [EnumerateAndAssert]([
    { key: 'Alice', value: [ 'Fluffy', 'Spike' ] },
    { key: 'Bob', value: [ 'Tiger' ] }
  ])

var lookup = of(
    { name: 'Alice', pet: 'Fluffy' },
    { name: 'Alice', pet: 'Spike' },
    { name: 'Bob', pet: 'Tiger' }
  )[ToLookup](
    function(x) { return x.name }
    // default selector
  )

assert.ok(lookup[Has]('Alice'))
assert.ok(lookup[Has]('Bob'))

lookup[Get]('Alice')[EnumerateAndAssert]([
  { name: 'Alice', pet: 'Fluffy' }, 
  { name: 'Alice', pet: 'Spike' }
], { key: 'Alice' })

lookup[Get]('Bob')[EnumerateAndAssert]([
  { name: 'Bob', pet: 'Tiger' }
], { key: 'Bob' })
