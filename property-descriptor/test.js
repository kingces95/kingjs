var target = { };

Object.defineProperty(
  target, 'foo', {
    value: 0,
    enumerable: true
  }
)

var descriptor = Object.getOwnPropertyDescriptor(target, 'foo');
