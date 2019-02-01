```js
defineProperty(target, namedFunction)
  => defineProperty(target, name, { value: namedFunction, ... })
  
defineProperty(target, { get|set|value: namedFunction, ... })
  => defineProperty(target, name, { get|set|value: namedFunction, ... })

defineProperty(target, name, nonObjectOrNull)
  => defineProperty(target, name, { value: nonObjectOrNull })
```
