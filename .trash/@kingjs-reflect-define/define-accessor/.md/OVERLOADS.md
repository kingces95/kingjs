```js
defineAccessor(target, get[, set])
  => defineProperty(target, get.name || set.name, { get, set });

defineAccessor(target, name, get[, set])
  => defineProperty(target, name, { get, set });

defineAccessor(target, name, string[, string])
  => defineProperty(target, name, { get: lambda, set: lambda });

// inherited from @kingjs/reflect.define-property
defineAccessor(...)
  => defineProperty(...);
```
