var {
  ['@kingjs']: { 
    reflect: { implementInterface },
    Generator, 
    IIterable, 
    IIterable: { GetIterator }, 
  }
} = require('./dependencies');

var makeEnumerable = require('./make-enumerable');

implementInterface(Generator.prototype, IIterable, {
  methods: { getIterator: 'this()' }
});

makeEnumerable(Generator.prototype, 
  function createMoveNext(instance) {
    var iterator = null;

    return function moveNext() {
      if (!iterator) {
        var iterable = instance();
        iterator = iterable[GetIterator]();
      }
      var next = iterator.next();
      this.current_ = next.value;
      return !next.done;
    };
  }
)