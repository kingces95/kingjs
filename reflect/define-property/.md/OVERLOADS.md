```js
defineProperty(target, namedFunction)
  => defineProperty(target, name, { value: namedFunction, ... })
  
defineProperty(target, { value: namedFunction, ... })
  => defineProperty(target, name, { value: namedFunction, ... })

defineProperty(target, { get|set: namedFunction, ... })
  => defineProperty(target, name, { get|set: namedFunction, enumerable: true, ... })

defineProperty(target, name, { get|set: string, ... })
  => defineProperty(target, name, { get|set: lambda, enumerable: true, ... })

defineProperty(target, name, { value: string, lazy|extends: truthy, ... })
  => defineProperty(target, name, { value: lambda, lazy|extends: truthy, ... })

defineProperty(target, name, nonObjectOrNull)
  => defineProperty(target, name, { value: nonObjectOrNull, enumerable: true })
```
