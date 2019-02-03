```js
defineField(target, name, string)
  => defineProperty(target, name, { value: lambda, function: true });

// inherited from @kingjs/reflect.define-property
defineField(...)
  => defineProperty(...);
```
