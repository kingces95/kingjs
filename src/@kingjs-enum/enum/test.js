var { assert,
  '@kingjs': { 
    IEquatable, 
    IComparable,
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
    '-enum': { Enum },
    '-reflect': { isNumber }
  }
} = module[require('@kingjs-module/dependencies')]()

assert.ok(Enum.prototype instanceof Number)

class MyEnum extends Enum {
  constructor(value, name) {
    super(value, name)
  }
}

MyEnum.Foo = new MyEnum(1, 'Foo')
MyEnum.Bar = new MyEnum(2, 'Bar')

var { Foo, Bar } = MyEnum

assert.ok(Foo instanceof MyEnum)
assert.equal(Foo.name, 'Foo')
assert.equal(Foo.toString(), 'Foo')

assert.ok(Foo instanceof IEquatable)
assert.ok(Foo[Equals](Foo))
assert.ok(!Foo[Equals](Bar))
assert.ok(!Foo[Equals]())
assert.ok(isNumber(Foo[GetHashcode]()))
assert.notEqual(Foo[GetHashcode](), Bar[GetHashcode]())

assert.ok(Foo instanceof IComparable)
assert.ok(Foo[IsLessThan](Bar))
assert.ok(!Bar[IsLessThan](Foo))