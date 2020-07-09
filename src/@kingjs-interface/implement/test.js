var { assert,
  '@kingjs': { 
    '-interface': { Interface, Implement, define }
  }
} = module[require('@kingjs-module/dependencies')]()

class IIterable extends Interface {
  static get GetIterator() { return Symbol.iterator }
}

assert([] instanceof IIterable)

var instance = IIterable[Implement]({ 
    foo: 0 
  }, {
    *GetIterator() {
      for (var name in this)
        yield { name, value: this[name] };
    }
  }
);

var iterator = instance[IIterable.GetIterator]();
var next = iterator.next();
assert(!next.done);
assert.deepEqual(next.value, { name: 'foo', value: 0 });
next = iterator.next();
assert(next.done);

var GetEnumerator = Symbol()
class IEnumerable extends Interface {
  static get GetEnumerator() { return GetEnumerator }
}

var Current = Symbol()
var MoveNext = Symbol()
class IEnumerator extends Interface {
  static get Current() { return Current }
  static get MoveNext() { return MoveNext }
}

// Demonstrate a multi property interfaces like this:
// `IEnumerable` has a single method `getEnumerator` that returns an
// `IEnumerator` that has a property `current` and a method `moveNext`
// which returns `true` if there are more elements or `false` if not.
IEnumerable[Implement](Array.prototype, {
  GetEnumerator() {
    var target = this;
    var index = -1;

    // return a quick and dirty implementation of `IEnumerator` like this:
    return {
      [IEnumerator.MoveNext]() { return ++index < target.length },
      get [IEnumerator.Current]() { return target[index] }
    }
  }
});

var instance = [ 1 ];
var enumerator = instance[IEnumerable.GetEnumerator]();
assert(enumerator[IEnumerator.MoveNext]());
assert(enumerator[IEnumerator.Current] == 1);
assert(!enumerator[IEnumerator.MoveNext]());
