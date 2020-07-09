var { assert,
  '@kingjs': { 
    IEquatable, 
    IComparable,
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-enum': { define },
    '-reflect': { isNumber },
  }
} = module[require('@kingjs-module/dependencies')]()

var MyEnum = define("MyEnum", [ 'Foo', 'Bar' ])

assert.ok(MyEnum instanceof Function)

var { Foo, Bar } = MyEnum

assert.ok(Foo instanceof MyEnum)
assert.equal(Foo.name, 'Foo')
assert.equal(Foo.toString(), 'Foo')

assert.ok(Foo == 0)
assert.ok(Bar == 1)

assert.ok(Foo instanceof IEquatable)
assert.ok(Foo[Equals](Foo))
assert.ok(!Foo[Equals](Bar))
assert.ok(!Foo[Equals]())
assert.ok(isNumber(Foo[GetHashcode]()))
assert.notEqual(Foo[GetHashcode](), Bar[GetHashcode]())

assert.ok(Foo instanceof IComparable)
assert.ok(Foo[IsLessThan](Bar))
assert.ok(!Bar[IsLessThan](Foo))