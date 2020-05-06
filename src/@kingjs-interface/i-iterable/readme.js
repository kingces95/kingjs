var { assert,
  '@kingjs': {
    '-interface': { IIterable }
  }
} = module[require('@kingjs-module/dependencies')]()

var Id = Symbol.iterator;
var IInterfaceId = Symbol.for('@kingjs/IInterface.id');

assert(IIterable.name == '@kingjs/IIterable');
assert(IIterable[IInterfaceId] == Id);
assert([] instanceof IIterable);
assert('' instanceof IIterable);